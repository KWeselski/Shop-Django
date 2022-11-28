import React from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Box, Button, Container, Divider } from '@chakra-ui/react';
import Completed from './Completed';
import Step1 from './Step1';
import Step2 from './Step2';

const steps = [
  { label: 'Fill data', content: <Step1 /> },
  { label: 'Payment', content: <Step2 /> },
  { label: 'Completed', content: <Completed /> }
];

const Order = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  });

  return (
    <React.Fragment>
      <Container width="100%" maxW={'7xl'} mt="30" centerContent>
        <Steps activeStep={activeStep}>
          {steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              <Box
                p={6}
                width="500px"
                borderWidth={1}
                boxShadow="lg"
                borderColor="black"
                mt={'50px'}
              >
                {React.cloneElement(content, {
                  prevStep: prevStep,
                  nextStep: nextStep
                })}
              </Box>
            </Step>
          ))}
        </Steps>
      </Container>
      <Divider m="5" />
      <Button onClick={() => nextStep()}>Dalej</Button>
    </React.Fragment>
  );
};

export default Order;
