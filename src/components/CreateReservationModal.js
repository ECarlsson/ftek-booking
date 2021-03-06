import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

const CreateReservationModal = ({ timeslot, date, roomName }) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const timeslotString = `${timeslot.fromTime.slice(0, 5)}-${timeslot.toTime.slice(0, 5)} ${timeslot.name}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(false);
    const formData = {
      date: date,
      timeslot: timeslot.id,
      name: event.target.name.value,
      email: event.target.email.value,
      cid: event.target.cid.value,
      society: event.target.society.value.length ? event.target.society.value : null,
      description: event.target.description.value,
      inspectionTime: event.target.inspectionTime ? event.target.inspectionTime.value : null
    };
    const res = await fetch(
      '/api/reservation',
      {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );
    if (res.ok) {
      setShowSubmitModal(false);
      setShowSuccessModal(true);
    } else {
      setSubmitError(true);
    }
  };

  return (
    <>
      <Button variant="lightblue" block onClick={() => setShowSubmitModal(true)}>{timeslotString}</Button>
      <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Boka lokal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">{`${roomName}, ${date.toLocaleDateString()}, ${timeslotString}`}</p>
            <Form.Group controlId="createReservationFormName">
              <Form.Label>Namn</Form.Label>
              <Form.Control name="name" type="text" placeholder="Skriv in ditt namn" required />
            </Form.Group>
            <Form.Group controlId="createReservationFormEmail">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control name="email" type="email" placeholder="Skriv in din e-postadress" required />
            </Form.Group>
            <Form.Group controlId="createReservationFormCID">
              <Form.Label>CID</Form.Label>
              <Form.Control name="cid" type="text" placeholder="Skriv in ditt CID" required />
            </Form.Group>
            <Form.Group controlId="createReservationFormSociety">
              <Form.Label>Kommitt??/F??rening</Form.Label>
              <Form.Control name="society" type="text" placeholder="Skriv in din kommitt??/f??rening (ej obligatoriskt)" />
            </Form.Group>
            <Form.Group controlId="createReservationFormDescription">
              <Form.Label>Arrangemang</Form.Label>
              <Form.Control name="description" as="textarea" placeholder="F??rklara vilket arrangemang du ska ha lokalen till" required />
            </Form.Group>
            {/*(timeslot.inspectionTimes && timeslot.inspectionTimes.length !== 0) &&
              <Form.Group controlId="createReservationFormInspectionTime">
                <Form.Label>Avsyningstid</Form.Label>
                <Form.Label className="text-muted">V??lj n??r arrangemanget ska vara klart och lokalen redo f??r avsyning</Form.Label>
                <Form.Control name="inspectionTime" as="select" required>
                {timeslot.inspectionTimes.map((inspectionTime) => <option key={inspectionTime.time} value={inspectionTime.time}>{inspectionTime.time.slice(0, 5)}</option>)}
                </Form.Control>
            </Form.Group>*/}
              {submitError && <Alert variant="danger">N??got gick fel, det gick inte skicka bokningsf??rfr??gan!</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="lightgrey" onClick={() => setShowSubmitModal(false)}>St??ng</Button>
            <Button variant="lightblue" type="submit">Skicka</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          Bokningsf??rfr??gan skickad!
        </Modal.Header>
        <Modal.Body>
          En bekr??ftelse p?? bokningsf??rfr??gan skickas till den angivna e-postadressen. Du f??r ett till e-postmeddelande n??r din bokningsf??rfr??gan har blivit behandlad.
        </Modal.Body>
         <Modal.Footer>
          <Button variant="lightgrey" onClick={() => setShowSuccessModal(false)}>St??ng</Button>
         </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateReservationModal;