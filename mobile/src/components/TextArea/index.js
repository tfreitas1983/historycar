import React, {forwardRef} from "react";
import PropTypes from 'prop-types';
import  Icon from "react-native-vector-icons/MaterialIcons";

import { Container, TTextArea} from './styles';

function TextArea ({style, icon, ...rest}) {
    return (
        <Container style={style}>
            {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.6)" />}
            <TTextArea {...rest}   multiline numberOfLines={10} style={{ textAlignVertical: 'top',}}/>
        </Container>
    )
}

TextArea.PropTypes = {
    icon: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

};

TextArea.defaultProps = {
    icon: null,
    style: {},
}


export default TextArea;