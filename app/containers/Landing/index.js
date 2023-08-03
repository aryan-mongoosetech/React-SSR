import React, { Fragment, useEffect } from 'react';
import i18next from 'i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Welcome } from 'Components';
import { setNotif } from 'Actions';

function Landing(props) {
  const { t } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotif({ message: t('MSG001'), variant: 'success' }));
  }, []);

  return (
    <Fragment>
      <Helmet>
        <html lang={i18next.language} dir={i18next.dir(i18next.language)} />
      </Helmet>

      <Welcome />
    </Fragment>
  );
}

Landing.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Landing);
