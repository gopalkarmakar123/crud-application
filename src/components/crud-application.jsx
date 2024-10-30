import { React, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import add_plus_icon from "../add_plus_icon.svg";
export default function CrudApplication() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    age: 0,
    salary: 0,
  });
  const storeData = obj => {
    console.log(obj);
    const newFormData= {...formData, ...obj};
    setFormData(newFormData)
  }

  const checkValidity =  (property) =>
     (formData.hasOwnProperty(property) && ['', null,undefined,0].includes(formData[property]))
  
  const isFormValid = () => {
    let isValid = false;
    for(let key in formData){
      if(['',null, undefined].includes(formData[key])) isValid= false
    }
    return isValid;
  }
  const submitData = e =>{
    if(!isFormValid()) {
      alert("Please fill up the required field.");
      e.preventDefault();
    }
    
  }
  console.log(formData);
  

  const toggle = () => setModal(!modal);
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Card body className="my-2">
            <CardTitle tag="h5">Add New</CardTitle>
            <CardText>
              <img src={add_plus_icon} />
            </CardText>
            <Button color="primary" onClick={toggle}>
              Add New
            </Button>
          </Card>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={submitData}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label >ID</Label>
                  <Input invalid={checkValidity('id')} onInput={e =>{ storeData({id: e.target.value})}}/>
                  <FormFeedback invalid>
                    Id is required.
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label >Name</Label>
                  <Input invalid={!formData.name} onInput={e =>{ storeData({name: e.target.value})}}/>
                  <FormFeedback invalid>
                    Name is required.
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label >Age</Label>
                  <Input invalid={!formData.age} onInput={e =>{ storeData({age: e.target.value})}}/>
                  <FormFeedback invalid>
                    Age is required.
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label >Salary</Label>
                  <Input invalid={!formData.salary} onInput={e =>{ storeData({salary: e.target.value})}}/>
                  <FormFeedback invalid>
                    Salary is required.
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="col-md-6"></div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              type="submit"
              // onSubmit={submitData}
            >
              Submit Data
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
