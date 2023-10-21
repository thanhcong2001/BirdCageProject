import OTPForm from "./OTPForm"

const OTP = (props) => {
    // const { closeDialog, setMode, MODE } = props;

    const handleSubmit = async (value) => {
        console.log('Form Submit: ', value);

        try {

            // if (closeDialog) {
            //     setMode(MODE.LOGIN)
            //     closeDialog();
            // }
        } catch (error) {
            console.log('Failed', error);
        }


    }

    return (
        <div>
            <OTPForm onSubmit={handleSubmit} />
        </div>
    )
}

export default OTP