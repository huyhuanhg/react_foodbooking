import styled, { css } from 'styled-components';

export const Container = styled.div``;
export const Sidebar = styled.div`
  box-shadow: 0 0 3px rgb(52 58 64 / 15%);
  background-color: #fff;
  transition: all 0.3s ease;
  width: 300px;
  height: 100%;
  max-height: 100%;
  position: fixed;
  top: 0;
  ${(props) =>
    props.isShow
      ? css`
          left: 0;
        `
      : css`
          left: -300px;
        `}
  z-index: 999;
  border-right: 1px solid #e9ecef;
`;
export const SiteLayout = styled.div`
  position: relative;
  ${(props) =>
    props.isFull
      ? css`
          padding-left: 0;
        `
      : css`
          padding-left: 300px;
        `}
  transition: all 0.3s ease;
  background-color: #f1f6ff !important;
`;
export const Header = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  ${(props) =>
    props.isFull
      ? css`
          left: 0;
        `
      : css`
          left: 301px;
        `}
  z-index: 999;
  max-height: 70px;
  transition: all 0.3s;
`;
export const Content = styled.div`
  padding: 94px 16px 0;
  min-height: calc(100vh - 160px);
  box-sizing: content-box;
`;
export const Footer = styled.div`
  border-top: 1px solid #e9ecef;
  height: 64px;
`;
