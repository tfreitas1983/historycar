import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 15px;
    height: 75px;
    background: rgba(255,200,0,0.1);    
    border: 2px;
    border-color: #efefef; 
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255, 0.8)',
})`
    flex: 1;
    font-size: 20px;
    margin-left:10px;   
    color:#fff;
`;