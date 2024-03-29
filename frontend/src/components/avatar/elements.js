import { variant } from '@xstyled/system'
import styled, { css } from '@xstyled/styled-components'

export const Container = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 12;
  justify-content: center;
  text-transform: uppercase;
  user-select: none;
  width: 12;

  ${variant({
    default: 'normal',
    variants: {
      normal: css`
        height: 12;
        width: 12;
      `,
      small: css`
        height: 10;
        width: 10;
      `,
      tiny: css`
        height: 8;
        width: 8;
        font-size: 0;
      `
    }
  })}
`
