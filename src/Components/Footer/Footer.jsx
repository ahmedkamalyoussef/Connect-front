import React from 'react';
import { initMDB, Ripple } from 'mdb-ui-kit'; // Import MDB UI Kit components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // If you are using Font Awesome icons
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Import specific icons
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS for icons
import { Container, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

initMDB({ Ripple });

const Footer = () => {
  return (
    <footer className="text-center bg-body-tertiary">

      <Container fluid className="pb-2" >
        <section className="mb-0">
          <Row className="justify-content-center">
            {/* Facebook */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </Col>

            {/* Twitter */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </Col>

            {/* Google */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
            </Col>

            {/* Instagram */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </Col>

            {/* Linkedin */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </Col>

            {/* Github */}
            <Col xs="auto" className="m-1">
              <a
                href="#!"
                className="btn btn-link btn-floating btn-lg text-body"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Col>
          </Row>
        </section>
      </Container>
      
    </footer>
  );
};

export default Footer;
