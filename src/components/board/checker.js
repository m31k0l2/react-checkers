import React from 'react'
import { WHITE, QUEEN } from '../../actions/actions'
import styled, { keyframes } from 'styled-components'
import { generateCSSAnimation } from 'checkers/checkers'

const Checker = styled.div`
    width: 40px;
    height: 40px;        
    border: 3px solid;
    margin-top: 12px;
    margin-left: 12px;
    border-radius: 50%;
    text-align: center;
    position: relative;
`;

const WhiteChecker = Checker.extend`
    background: #ccc;
    border-color: #000;
    color: #000;
`;

const BlackChecker = Checker.extend`
    background: #000;
    border-color: #ccc;
`;

const WhiteQueen = WhiteChecker.extend`
    background-image: url("/whiteQueen.svg");
    background-position: 4px 2px;
`;

const BlackQueen = BlackChecker.extend`
    background-image: url("/blackQueen.svg");
    background-position: 4px 2px;
`;

export default ({ checkerInfo, animate }) => {    
    if (checkerInfo.type) {
        if (checkerInfo.color === WHITE) {
            if (checkerInfo.type === QUEEN) {
                this.checker = WhiteQueen
            } else {
                this.checker = WhiteChecker
            }
        }
        else {
            if (checkerInfo.type === QUEEN) {
                this.checker = BlackQueen
            } else {
                this.checker = BlackChecker
            }
        }
        if (animate) {
            const AnimateChecker = this.checker.extend`
                position: absolute;
                animation: ${keyframes`${generateCSSAnimation(animate, 70)}`} ease-in-out 1s;
                animation-fill-mode: forwards;
                animation-duration: .5s;
                z-index: 100;`
            this.checker = AnimateChecker
        }
    } else {
        this.checker = null
    }
    console.log(animate);
    
    return this.checker ? <this.checker className="checker"/> : null
}
