import { useState } from "react";
import { Stepper, Button, Group } from '@mantine/core';

const StepperComponent = () => {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 6 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    return (
        <div>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="مراجعة الوقائع" >
                    Step 1 content: Create an account
                </Stepper.Step>
                <Stepper.Step label="التحليل القانوني" >
                    Step 2 content: Verify email
                </Stepper.Step>
                <Stepper.Step label="قائمة الدفوع">
                    Step 3 content: Verify email
                </Stepper.Step>
                <Stepper.Step label="الطلبات الختامية">
                    Step 4 content: Verify email
                </Stepper.Step>
                <Stepper.Step label="المذكرة النهائية">
                    Step 5 content: Verify email
                </Stepper.Step>
                <Stepper.Step label="المناقشة القانونية">
                    Step 6 content: Get full access
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </div>
    );
};

export default StepperComponent;