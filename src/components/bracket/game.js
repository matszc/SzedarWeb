import React from "react";
import style from "./bracket.module.scss";
import PropTypes from "prop-types";

export const Game = ({config, position, gameInfo, click}) => {
    const {height, width, playerBackground, scoreBackground, color} = config;
    return (
        <svg className={style.game} width={width} height={config.height} x={position.x} y={position.y}>
            <g onClick={() => click(gameInfo)}>
                <rect width={width * 0.8} height={height / 2} fill={playerBackground} x={0} y={0}/>
                <text x={width * 0.05} y={height * 0.3} fontSize={height * 0.25} fill={color}>{gameInfo.player1}</text>
                <rect width={width * 0.2} height={height / 2} fill={scoreBackground} x={width * 0.8} y={0}/>
                <text x={width * 0.8 + 10} y={height * 0.35} fontSize={height * 0.3}
                      fill={color}>{gameInfo.player1Score}</text>

                <rect width={width * 0.8} height={height / 2} fill={playerBackground} x={0} y={height / 2}/>
                <text x={width * 0.05} y={height / 2 + height * 0.3} fontSize={height * 0.25}
                      fill={color}>{gameInfo.player2}</text>
                <rect width={width * 0.2} height={height / 2} fill={scoreBackground} x={width * 0.8} y={height / 2}/>
                <text x={width * 0.8 + 10} y={height / 2 + height * 0.35} fontSize={height * 0.3}
                      fill={color}>{gameInfo.player2Score}</text>
            </g>
        </svg>
    )
};

Game.propTypes = {
    config: PropTypes.object,
};

export default Game;
