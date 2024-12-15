import React, { useContext, useEffect, useState } from 'react';
import ModelManager from '../../utils/modelmanager';
import Header from '../header/header';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prepareRequest } from '../../utils';
import { useErrorHandler } from 'react-error-boundary';
import { AppContext } from '../../utils/context';
import Modal from '../modal';
import './preview.css';

const Preview = () => {
  const context = useContext(AppContext);
  const handleError = useErrorHandler();
  const [config, setConfiguration] = useState('');
  const [data, setData] = useState('');

  const props = useParams();
  const [modelType, path] = Object.values(props)[0].split(/\/(.*)/s);

  // https://author-p124903-e1367755.adobeaemcloud.com/graphql/execute.json/pocaemsfrace/getHeroMini
  //localhost:3000/${contentFragment.model.name}${contentFragment.path}

  useEffect(() => {
    const configPath = `/content/dam/${context.project}/site/configuration/configuration-v2`;
    const sdk = prepareRequest(context);
    sdk.runPersistedQuery(`aem-demo-assets/${context.pqs.config}`, { path: configPath })
      .then(({ data }) => {
        if (data) {
          setConfiguration(data);
          context.config = data;
          const params = { path: `/${path}` };
          if (context.serviceURL.includes('author')) params['ts'] = new Date().getTime();
          if (context.audience?.value) params['variation'] = context.audience?.value;

          if (modelType === 'uaHeroMini' || modelType === 'ua-hero-mini') {
            sdk.runPersistedQuery('pocaemsfrace/getHeroMini', params)
              .then(({ data }) => {
                if (data) {
                  console.log(data);
                  setData(data);
                }
              })
              .catch((error) => {
                error.message = `Error with gql-demo-${modelType} request:\n ${error.message}`;
                handleError(error);
              });
          } else {
            sdk.runPersistedQuery(`aem-demo-assets/gql-${modelType}`, params)
              .then(({ data }) => {
                if (data) {
                  setData(data);
                }
              })
              .catch((error) => {
                error.message = `Error with gql-demo-${modelType} request:\n ${error.message}`;
                handleError(error);
              });
          }
        }
      }).catch((error) => {
        error.message = `Error with gql-demo-configuration request:\n ${error.message}`;
        handleError(error);
      });


  }, [context, handleError, modelType, path]);

  let i = 0;

  return (
    <React.Fragment>
      <div className='main-body'>
        {data && data.component && data.component.item && data.component.item.__typename !== 'HeaderV2Model' && (
          <div
            key={`${data.component.item.__typename
              .toLowerCase()
              .replace(' ', '-')}-block-${i}`}
            className='block'
          >
            <ModelManager
              key={`${data.component.item.__typename}-entity-${i++}`}
              content={data.component.item}
              references={data.component._references}
              config={config.configurationByPath.item}
            ></ModelManager>
          </div>
        )}
        {config && config.configurationByPath && config.configurationByPath.item && (
          <Modal config={config.configurationByPath.item} />
        )}

      </div>
      <footer>

      </footer>
    </React.Fragment>
  );
};

Preview.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export default Preview;
