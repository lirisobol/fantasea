import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import styles from "./Navigation.module.scss";
export function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.NavWrapper}>
        <Navbar expand="xs" className="p-1 w-100" bg="dark" data-bs-theme="dark">
            <Container className={styles.NavContainer}>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    show={show}
                    onHide={handleClose}
                    data-bs-theme="dark"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">
                        FPLStats
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className='me-auto '>
                        <Nav.Link className={styles.NavLink} as={Link} to="/" onClick={handleClose}>
                            Home 
                            <FontAwesomeIcon icon={faChevronRight} className={styles.NavArrowIcon} />
                        </Nav.Link>
                        <Nav.Link className={styles.NavLink} as={Link} to="/research" onClick={handleClose}>
                            Research 
                            <FontAwesomeIcon icon={faChevronRight} className={styles.NavArrowIcon} />
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </div>
  );
}
