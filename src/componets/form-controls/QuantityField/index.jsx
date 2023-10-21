import styled from '@emotion/styled';
import { Box } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormControl, FormHelperText, IconButton, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function QuantityField(props) {
    const { form, name, label } = props;
    const { control, setValue } = form;

    const BoxNum = styled(Box)(() => ({
        display: 'flex',
        flexFlow: 'nowrap',
        alignItems: 'center',
        maxWidth: 123,
    }))

    const IconNum = styled(IconButton)(() => ({
        backgroundColor: '#f1f1f1',
        color: 'black',
        height: 40,
        width: 35,
        borderRadius: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dddddd',
    }))

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, error }
            }) => (
                <>
                    <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined" size='small'>
                        <BoxNum>
                            <IconNum onClick={() => setValue(name, Number.parseInt(value) && Number.parseInt(value) > 1 ? Number.parseInt(value) - 1 : 1)}>
                                <RemoveIcon />
                            </IconNum>
                            <OutlinedInput
                                id={name}
                                error={invalid}
                                type="text"
                                labelWidth={70}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                style={{paddingLeft:'9px'}}
                            />

                            <IconNum onClick={() => setValue(name, Number.parseInt(value) && Number.parseInt(value) > 0 ? Number.parseInt(value) + 1 : 1)}>
                                <AddIcon />
                            </IconNum>

                        </BoxNum>
                    </FormControl>
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </>
            )}
        />
    );
}

export default QuantityField;