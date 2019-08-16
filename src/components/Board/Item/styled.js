import styled from 'styled-components';

export const Item = styled.div`
    align-self: stretch;
    position: relative;
    transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -webkit-transition: all .2s ease-out;
    background-color: ${props => {
        switch(props.itemValue) {
            case 2: return '#C17799';
            case 4: return '#B9668D';
            case 8: return '#B15580';
            case 16: return '#AA4474';
            case 32: return '#9B3E6A';
            case 64: return '#8C385F';
            case 128: return '#7C3255';
            case 256: return '#6D2C4A';
            case 512: return '#5D2640';
            case 1024: return '#4E1F35';
            case 2048: return '#3E192B';
            default: return '#E0BBCC';
        }
    }};
    &::before {
        ${props => {
            if(props.itemValue !== 0) {
                return `
                    position: absolute;
                    font-weight: 700;
                    color: #FFFFFF;
                    font-size: 42px;
                    content: "${props.itemValue}";
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    @media (max-width: 540px) {
                        font-size: 32px;
                    }
                    @media (max-width: 480px) {
                        font-size: 24px;
                    }
                    @media (max-width: 400px) {
                        font-size: 21px;
                    }
                `;
            }
        }}
    }
`;