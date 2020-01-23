import React from "react";
import {treeConfig} from "../../components/bracket/treeConfig";
import Game from "./game";

const Bracket = ({data, gameClick}) => {

    const size = {
        width: 240 * data[data.length - 1].round + 100,
        height: 100 * Math.pow(2, data[data.length - 1].round - 1) + 100,
    };

    return (
        <svg height={size.height} width={size.width}>
            <g>
                {data.map(m => {
                    const round = m.round - 1;
                    let baseY = 0;
                    for (let i = 0; i < round; i++) {
                        baseY += Math.pow(2, i) * 50;
                    }
                    const code = parseInt(m.matchCode.slice(1), 10) - 1;

                    const baseStep = Math.pow(2, round) * 100;
                    const step = baseStep * code;

                    const pos = {x: (m.round - 1) * 240, y: baseY + step};

                    const vString = code === 0 || code % 2 === 0 ? `${(pos.y + 25) + (baseStep / 2)}`
                        : `${(pos.y + 25) - (baseStep / 2)}`;

                    return (
                        <g key={m.matchCode}>
                            <Game
                                click={gameClick}
                                config={treeConfig.game}
                                position={pos}
                                gameInfo={m}/>
                            {!m.nextMatch ? null : <path
                                d={`M ${pos.x + 150} ${pos.y + 25} H ${pos.x + 150 + 45} V ${vString} H ${pos.x + 150 + 90}`}
                                fill={'none'} stroke={'white'} strokeWidth={'2'}/>}
                        </g>
                    )
                })}
            </g>
        </svg>
    )
};

export default Bracket;
