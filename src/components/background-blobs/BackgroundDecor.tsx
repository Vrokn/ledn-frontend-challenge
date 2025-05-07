/** @jsxImportSource @emotion/react */
import { useMantineColorScheme } from '@mantine/core';
import { keyframes, css } from '@emotion/react';

const bounce1 = keyframes`
  0%, 100% { transform: scale(1) translate(0,0) skew(0deg, 0deg); }
  50% { transform: scale(1.3) translate(-100px, -100px) skew(2deg, 1deg); }
`;

const bounce2 = keyframes`
  0%, 100% { transform: scale(1) translate(0,0) skew(0deg, 0deg); }
  50% { transform: scale(0.9) translate(-100px, -80px) skew(-2deg, -1deg); }
`;

const bounce3 = keyframes`
  0%, 100% { transform: scale(1) translate(0,0) skew(0deg, 0deg); }
  50% { transform: scale(1.2) translate(50px, 50px) skew(1deg, 0deg); }
`;

const bounce4 = keyframes`
  0%, 100% { transform: scale(1) translate(0,0) skew(0deg, 0deg); }
  33% { transform: scale(0.8) translate(-50px, -250px) skew(-1deg, 0deg); }
  66% { transform: scale(1.3) translate(-40px, 100px) skew(0deg, -1deg); }
`;

const bounce5 = keyframes`
  0%, 100% { transform: scale(1) translate(0,0) skew(0deg, 0deg); }
  33% { transform: scale(0.9) translate(250px, -50px) skew(3deg, 2deg); }
  66% { transform: scale(1.4) translate(150px, 30px) skew(2deg, 3deg); }
`;

const blobCss = (
  animation: ReturnType<typeof keyframes>,
  duration: string,
  color: string
) => css`
  border-radius: 50%;
  height: 450px;
  width: 450px;
  position: fixed;
  filter: blur(50px);
  background-color: ${color};
  animation: ${animation} ${duration} ease-in-out infinite;
  mix-blend-mode: difference;
  opacity: 0.3;
  z-index: -1;
`;

const Blobs = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const lightColors = ['#B7AFD4', '#F1798C', '#E8183A', '#140077', '#7766AF'];
  const darkColors = ['#005f73', '#0a9396', '#94d2bd', '#ee9b00', '#ca6702'];

  const colors = !isDark ? darkColors : lightColors;

  return (
    <>
      <div css={blobCss(bounce1, '7s', colors[0])} style={{ top: '220px', right: '20%' }} />
      <div css={blobCss(bounce2, '8s', colors[1])} style={{ top: '240px', left: '20%' }} />
      <div css={blobCss(bounce3, '9s', colors[2])} style={{ top: '290px', right: '30%' }} />
      <div css={blobCss(bounce4, '10s', colors[3])} style={{ top: '270px', left: '30%' }} />
      <div css={blobCss(bounce5, '11s', colors[4])} style={{ top: '320px', left: '40%' }} />
    </>
  );
};

export default Blobs;
