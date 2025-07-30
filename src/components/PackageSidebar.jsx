// components/ClientPackageDrawer.jsx
import React from 'react';
import { Offcanvas, Form, Button, Image } from 'react-bootstrap';
import DefaultAvatar from '../otherImages/default.png';
import { useDispatch } from 'react-redux';
import { assignPackage, sanitizePackages } from '../store/slices/assignedPackagesSlice';
import Swal from 'sweetalert2';

const PackageSidebar = ({ show, onClose, data }) => {
  const dispatch = useDispatch();
  console.log("data", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // dispatch(sanitizePackages());
      await dispatch(assignPackage(data.id)).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Package assigned Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    } catch (error) {
      Swal.fire('Error', error || 'Failed to assign package', 'error');
    }
  };
  if (!data) return null;

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="drawerSidebar">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='fw-bold'>Package Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="text-center mb-4">
          <Image
            src={data.packageImage || DefaultAvatar}
            roundedCircle
            height="120"
            width="120"
            alt="Package"
          />
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Package Name</Form.Label>
            <Form.Control type="text" value={data.name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <div
              className="form-control p-2"
              style={{ minHeight: '100px', padding:'10px' }}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" value={data.price} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="text" value={data.date} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" value={data.category} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deliverables</Form.Label>
            <Form.Control
              type="text"
              value={data.deliverables.map(item => item.name).join(', ')}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control type="text" value={data.additional_notes} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Document</Form.Label>
            <Form.Control type="text" value={data.document} readOnly />
          </Form.Group>

          <div className="text-end  d-flex justify-content-end gap-10 absolute">
            <Button className="btn bg-secondary d-flex gap-10 drawerBtn" onClick={onClose} >
              Close
            </Button>
            <Button onClick={handleSubmit} className='btn bg-primary text-white d-flex gap-10 drawerBtn'>Add Package</Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PackageSidebar;
