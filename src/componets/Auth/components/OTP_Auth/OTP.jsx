import OTPForm from "./OTPForm"
import useEmailForReset from "./useEmailForReset";

const OTP = (props) => {
    // const { closeDialog, setMode, MODE } = props;
    const { getEmailForReset, getEmailForResetPending } = useEmailForReset()
    const handleSubmit = async (value) => {
        try {
            await getEmailForReset(value)
        } catch (error) {
            console.log('Failed', error);
        }


    }

    return (
        <div>
            <OTPForm onSubmit={handleSubmit} getEmailForResetPending={getEmailForResetPending} />
        </div>
    )
}

export default OTP