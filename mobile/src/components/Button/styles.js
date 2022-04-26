import styled from 'styled-components/native';
import { BaseButton} from 'react-native-gesture-handler';

export const Container = styled(BaseButton)`
 
 height: 60px;
 width: 100%;
 background:  rgba(100,40,100,0.1);
 padding: 3px;
 margin-top: 15px;
 border: 2px;
 border-color: #fefefe; 
 border-radius: 4px;
 align-items: center;
 justify-content: center;
`;

export const Text = styled.Text`
    flex: 1;
    color: #fff;
    font-weight: bold;
    font-size: 36px;
`;
