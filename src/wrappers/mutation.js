import React from 'react';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';
import Raven from 'raven-js';

import { UPDATE_SCENARIO } from '../graphql/mutations/scenarios';

const defaultUpdate = () => { };

const showErrors = (errs) => {
  const messages = errs.map((err) => {
    let message = err.message;

    if (err.code === 'ER_DUP_ENTRY') {
      const fields = err.data.fields.map((field, index) => `${field} '${err.data.value[index]}'`).join(' and ');
      message = `A ${err.data.table} with ${fields} already exists`;
    }

    return message;
  });


  Swal({
    position: 'top',
    title: 'Error',
    text: messages.join('\n'),
    toast: true,
    showConfirmationButton: false,
    confirmButtonColor: '#0079FF',
    timer: 5000,
  });
}

const withMutation = (mapPropsToVariables, {
  mutation,
  validations = [],
  update = defaultUpdate,
  propName = 'mutation',
  showAlert = true
}) => WrappedComponent => {
  return (props) => {
    return (
      <Mutation mutation={UPDATE_SCENARIO}>
        {(updateScenario) => (
          <Mutation mutation={mutation}>
            {(mutate, { loading }) => {
              const handler = (variables) => {
                return new Promise((resolve) => {
                  const data = variables ? variables : mapPropsToVariables(props);

                  const validationResults = validations.reduce((acc, validation) => {
                    if (validation.function(data, props) === false) {
                      return [...acc, validation.message];
                    }

                    return acc;
                  }, []);

                  if (validationResults.length) {
                    const err = new Error(validationResults.join('\n'))
                    Raven.captureException(err);
                    showErrors([err]);
                    return;
                  }


                  mutate({ variables: data, update: update(props) })
                    .then((response) => {
                      if (localStorage.getItem('Scenario')) {
                        updateScenario({
                          variables: { where: { id: JSON.parse(localStorage.getItem('Scenario')).id }, data: { updatedAt: new Date() } }
                        });
                      }

                      resolve(response);
                      if (showAlert) {
                        Swal({
                          position: 'top',
                          title: 'Success',
                          showConfirmationButton: false,
                          confirmButtonColor: '#0079FF',
                          toast: true,
                          timer: 2000,
                        })
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      Raven.captureException(err);
                      showErrors(err.graphQLErrors);
                    })
                })
              }

              return (<WrappedComponent {...props} {...{ [propName]: { execute: handler, loading } }} />);
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
};

export default withMutation;
