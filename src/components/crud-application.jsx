import { React, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
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
  const [dataList, setDataList]= useState(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) :  []);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: 0,
    salary: 0,
  });
  const [selectedKey,setSelectedKey] = useState(null);
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
    e.preventDefault();
    // if(!isFormValid()) {
    //   alert("Please fill up the required field.");
    // }

    let newList =dataList;
    if(selectedKey){
      newList[selectedKey]  = formData;
    }else{
      newList= [...dataList, ...[formData]];
    }
    console.log(newList);
    setDataList(newList);
    localStorage.setItem("data", JSON.stringify(newList));
    resetData();
    setModal(false);
  }
  
  console.log(dataList);
  const resetData= () => {
    setFormData({
      id: '',
      name: '',
      age: 0,
      salary: 0,
    });
  }

  const toggle = () => setModal(!modal);
  const showModal = e => {
    const key = e.target?.dataset['key'];
    if(key){
      const editData= dataList.filter((obj, idx) => idx === parseInt(key))[0];
      setSelectedKey(key);
      setFormData(editData);
    }else{
      setSelectedKey(null);
      resetData();
    }
    setModal(true);
  }

  const deleteItem = e => {
    const key = e.target.dataset['key'];
    if(window.confirm("are you sure")) {
      const newDataList =dataList.filter((obj, idx) => idx !== parseInt(key));
      setDataList(newDataList);
      localStorage.setItem("data", JSON.stringify(newDataList));

    }
   
  }
  console.log(selectedKey);
  
  return (
    <>
      <div className="row d-flex align-items-stretch">
        <div className="col-md-4 col-lg-3">
          <Card body>
            <CardTitle tag="h5">Add New</CardTitle>
            <CardText className="text-center">
              <img src={add_plus_icon} height="80px" />
            </CardText>
            <Button color="primary" onClick={showModal}>
              Add New
            </Button>
          </Card>
        </div>
        {dataList.map((data,key) => 
          

          <div className="col-md-4 col-lg-3" key={key}>
            <Card body>
              <CardTitle tag="h5">#{data.id} {data.name}</CardTitle>
              <CardText>
                <h6><span>Name: </span> <b>{data.name}</b> </h6>
                <h6><span>Age: </span> <b>{data.age}</b> </h6>
                <h6><span>Salary: </span> <b>{data.salary}</b> </h6>
                
              </CardText>
              <CardFooter className="d-flex justify-content-between">

                <Button color="primary" onClick={showModal} data-key={key}>
                  Edit Data
                </Button>
                <Button color="danger" onClick={deleteItem} data-key={key}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        <Modal isOpen={modal} toggle={toggle}>
          <Form onSubmit={submitData}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label >ID</Label>
                    <Input invalid={!formData.id} value={formData.id} onInput={e =>{ storeData({id: e.target.value})}}/>
                    <FormFeedback invalid>
                      Id is required.
                    </FormFeedback>
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label >Name</Label>
                    <Input invalid={!formData.name} value={formData.name} onInput={e =>{ storeData({name: e.target.value})}}/>
                    <FormFeedback invalid>
                      Name is required.
                    </FormFeedback>
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label >Age</Label>
                    <Input invalid={!formData.age} value={formData.age} onInput={e =>{ storeData({age: e.target.value})}}/>
                    <FormFeedback invalid>
                      Age is required.
                    </FormFeedback>
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label >Salary</Label>
                    <Input invalid={!formData.salary} value={formData.salary} onInput={e =>{ storeData({salary: e.target.value})}}/>
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
      </div>
    </>
  );
}
