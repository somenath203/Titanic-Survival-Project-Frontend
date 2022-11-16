import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import DotLoader from "react-spinners/DotLoader";
import HashLoader from "react-spinners/HashLoader";
import swal from '@sweetalert/with-react'

import './TitanicForm.css';


const TitanicForm = () => {

  const [openingLoadingScreen, setOpeningLoadingScreen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [sex, setSex] = useState('');
  const [pClass, setPClass] = useState('');
  const [age, setAge] = useState('');
  const [nosbsp, setNoSbsp] = useState('');
  const [noParch, setNoParch] = useState('');
  const [embarkLoc, setEmbarkLoc] = useState('');


  useEffect(() => {

    setOpeningLoadingScreen(true);

    setTimeout(() => {
      setOpeningLoadingScreen(false);
    }, 2500);

  }, []);


  const onSubmitTitanicForm = async (e) => {

    e.preventDefault();

    const sexNo = Number(sex);
    const pClassNo = Number(pClass);
    const ageNo = Number(age);
    const nosbspNo = Number(nosbsp);
    const noParchNo = Number(noParch);
    const embarkLocNo = Number(embarkLoc);

    try {

      setLoading(true);

      const { data } = await axios.post(process.env.REACT_APP_FLASK_BACKEND_API_URL, {
        sexNo,
        pClassNo,
        ageNo,
        nosbspNo,
        noParchNo,
        embarkLocNo
      });

      if (data.resultOfPred === '1') {

        setLoading(false);

        swal(
          <div>
            <h2>RESULT</h2>

            <br />

            <h4>
              Full name of the user: {fullName}
            </h4>
            <h4>
              Class of {fullName} in the ship: {pClass}
            </h4>
            <h4>
              Total number of siblings/spouse with {fullName} in the ship: {nosbsp}
            </h4>
            <h4>
              Total number of parent/children with {fullName} in the ship: {noParch}
            </h4>
            <h4>
              Port of Embarkement of {fullName}: {embarkLoc}
            </h4>

            <br />

            <h2>CRONGRAGULATIONS {fullName.toLocaleUpperCase()}, YOU HAVE SUCCESSFULLY SRURVIVED THE TITANIC DISASTER ✌️✌️</h2>

          </div>
        )


      } else if (data.resultOfPred === '0') {

        setLoading(false);

        swal(
          <div>
            <h2>RESULT</h2>

            <br />

            <h4>
              Full name of the user: {fullName}
            </h4>
            <h4>
              Class of {fullName} in the ship: {pClass}
            </h4>
            <h4>
              Total number of siblings/spouse with {fullName} in the ship: {nosbsp}
            </h4>
            <h4>
              Total number of parent/children with {fullName} in the ship: {noParch}
            </h4>
            <h4>
              Port of Embarkement of {fullName}: {embarkLoc}
            </h4>

            <br />

            <h2>DEAR {fullName.toLocaleUpperCase()}, YOU HAVE NOT SRURVIVED THE TITANIC DISASTER 😥😥</h2>

          </div>
        )

      }

    } catch (error) {

      setLoading(false);

      console.log(error);

    }


  };

  if (loading) {
    return (
      <div className="spinner-div">
        <DotLoader color={'#fff'} loading={loading} size={120} />
        <Text fontSize='2xl' mt='6'>EVALUATING RESULT...</Text>
      </div>
    )
  }

  const OpeningSpinner = () => {
    return (
      <div className="spinner-div">
        <HashLoader color={'#fff'} loading={openingLoadingScreen} size={100} />
      </div>
    )
  }


  return (
    <>
      {openingLoadingScreen ? <OpeningSpinner /> : <Flex w='100vw' h='100vh' alignItems='center' justifyContent='center' flexDirection='column' backgroundColor='#1A202C' color='#fff' className='titanic_form_div'>

        <Box mt='80' className='heading_box'>
          <Text fontSize='4xl' letterSpacing={5}>TITANIC FORM</Text>
        </Box>

        <Box w={{ sm: '70vw', md: '60vw', lg: '40vw' }} mt='12' className='form_box'>

          <form onSubmit={onSubmitTitanicForm}>

            {/* full name */}
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type='text' placeholder='enter your full name' onChange={(e) => setFullName(e.target.value)} />
            </FormControl>

            {/* Sex */}
            <FormControl mt='8' isRequired>
              <FormLabel>Gender</FormLabel>
              <Select placeholder='Select Your Gender' className='select_options' onChange={(e) => setSex(e.target.value)}>
                <option value='0'>Male</option>
                <option value='1'>Female</option>
              </Select>
            </FormControl>

            {/* Class */}
            <FormControl mt='8' isRequired>
              <FormLabel>Class in Ship</FormLabel>
              <Select placeholder='Select Your Class' className='select_options' onChange={(e) => setPClass(e.target.value)}>
                <option value='1'>First Class</option>
                <option value='2'>Second Class</option>
                <option value='3'>Third Class</option>
              </Select>
            </FormControl>

            {/* Age */}
            <FormControl mt='8' isRequired>
              <FormLabel>Age</FormLabel>
              <Input type='number' placeholder='enter your age' onChange={(e) => setAge(e.target.value)} />
            </FormControl>

            {/* Siblings/Spouse */}
            <FormControl mt='8' isRequired>
              <FormLabel>Number of Siblings/Spouse</FormLabel>
              <Input type='number' placeholder='enter the number of siblings/spouse that are with you in the ship' onChange={(e) => setNoSbsp(e.target.value)} />
            </FormControl>

            {/* Parent/Children */}
            <FormControl mt='8' isRequired>
              <FormLabel>Number of Parent/Children</FormLabel>
              <Input type='number' placeholder='enter the number of parent/children that are with you in the ship' onChange={(e) => setNoParch(e.target.value)} />
            </FormControl>

            {/* Embarked Destination */}
            <FormControl mt='8' isRequired>
              <FormLabel>Embarked Destination</FormLabel>
              <Select placeholder='Select Your Destination of Embarkement' className='select_options' onChange={(e) => setEmbarkLoc(e.target.value)}>
                <option value="0">Southampton</option>
                <option value="1">Cherbourg</option>
                <option value="2">Queenstown</option>
              </Select>
            </FormControl>

            <button className="form_submit_btn">PREDICT</button>

          </form>

        </Box>


      </Flex>}
    </>
  )
}

export default TitanicForm;