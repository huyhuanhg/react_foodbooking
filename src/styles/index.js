import styled, { css } from 'styled-components';
import { Button } from 'antd';

export const Logo = styled.div`
  height: 80px;
  width: 80px;
  margin: auto;
  background: url(https://forcky.com/assets/images/store-logo4.png) no-repeat;
`;

export const Icon = styled(Button)`
  height: 36px;
  width: 36px;
  line-height: 34px;
  padding: 0;
  ${(props) => props.type && css`  margin: 2px;`}
  border-radius: 30px;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  outline: none;
  ${
          (props) => {
            if (props.type === 'edit') {
              return css`
                background-color: rgba(83, 199, 151, 0.1) !important;
                border: 1px solid rgba(83, 199, 151, 0.1) !important;
                color: #53c797 !important;
                box-shadow: 0 3px 5px 0 rgb(83 199 151 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #53c797 !important;
                }
              `;
            } else if (props.type === 'destroy') {
              return css`
                background-color: rgba(240, 115, 90, 0.1) !important;
                border: 1px solid rgba(240, 115, 90, 0.1) !important;
                color: #f0735a !important;
                box-shadow: 0 3px 5px 0 rgb(240, 115, 90 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #f0735a !important;
                }
              `;
            } else {
              return css`
                background-color: rgba(57, 108, 240, 0.1) !important;
                border: 1px solid rgba(57, 108, 240, 0.1) !important;
                color: #396cf0 !important;
                box-shadow: 0 3px 5px 0 rgb(57 108 240 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #396cf0 !important;
                }
              `;
            }
          }}
  cursor: pointer;
  text-align: center;
  display: inline-block;
  font-weight: 400;
  user-select: none;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 41px;
  background-color: ${(props) => props.theme.bgFilter};
  width: 100%;
`;
