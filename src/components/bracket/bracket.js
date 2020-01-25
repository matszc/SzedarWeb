import React from "react";
import {treeConfig} from "../../components/bracket/treeConfig";
import Game from "./game";

const Bracket = ({upper, final, lower, gameClick}) => {

    const upperHeight = Math.pow(2, upper[upper.length - 1].round - 1);

    const size = lower ? {
            width: 240 * (upper[upper.length - 1].round + 2) > 240 * lower[lower.length - 1].round ?
                240 * (upper[upper.length - 1].round + 2) + 100
                : 240 * lower[lower.length - 1].round,
            height: 100 * (upperHeight + (upperHeight / 2)) + 200
        } :
        {
            width: 240 * upper[upper.length - 1].round + 100,
            height: 100 * upperHeight + 100,
        };

    return (
        <svg height={size.height} width={size.width}>
            <g>
                {upper.map((m, i) => {
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
                                d={`M ${pos.x + 150} ${pos.y + 25} H ${pos.x + 150 + 45} V ${final && i === upper.length - 1 ? pos.y + 25 : vString} H ${pos.x + 150 + 90}`}
                                fill={'none'} stroke={treeConfig.path.color}
                                strokeWidth={treeConfig.path.strokeWidth}/>}
                        </g>
                    )
                })}
                {final ? final.map((m, i) => {
                    const rounds = upper[upper.length - 1].round;
                    let baseY = 0;
                    for (let i = 0; i < rounds - 1; i++) {
                        baseY += Math.pow(2, i) * 50;
                    }

                    const pos = {x: rounds * 240 + i * 240, y: baseY};

                    return (
                        <g key={m.matchCode}>
                            <Game
                                click={gameClick}
                                config={treeConfig.game}
                                position={pos}
                                gameInfo={m}
                            />
                            {i === 0 ? <path
                                    d={`M${pos.x + 150} ${pos.y + 25} H ${pos.x + 150 + 90}`}
                                    stroke={treeConfig.path.color} strokeWidth={treeConfig.path.strokeWidth}
                                />
                                : null}
                        </g>
                    )
                }) : null}
                {lower ? <rect x={0} y={upperHeight * 100 - 20} width={size.width} stroke={'#999999'} strokeWidth={'2'}
                               opacity={'0.4'} height={10} fill={'black'}
                /> : null}
                {lower ? lower.map(m => {
                    const lowerStart = upperHeight * 100 + 20;
                    const round = (m.round - 1) % 2 !== 1 ? (m.round - 1) / 2 : (m.round - 2) / 2;
                    const code = parseInt(m.matchCode.slice(1), 10) - 1;

                    let baseY = 0;
                    for (let i = 0; i < round; i++) {
                        baseY += Math.pow(2, i) * 50;
                    }

                    const baseStep = Math.pow(2, round) * 100;
                    const step = baseStep * code;
                    const pos = {x: (m.round - 1) * 240, y: baseY + step + lowerStart};

                    const vString = m.round % 2 === 1 ? pos.y + 25 : code === 0 || code % 2 === 0 ? `${(pos.y + 25) + (baseStep / 2)}`
                        : `${(pos.y + 25) - (baseStep / 2)}`;

                    return (
                        <g key={m.matchCode}
                        >
                            <Game
                                click={gameClick}
                                config={treeConfig.game}
                                position={pos}
                                gameInfo={m}
                            />
                            {m.nextMatch.matchCode === 'Final1' ? null : <path
                                d={`M ${pos.x + 150} ${pos.y + 25} H ${pos.x + 150 + 45} V ${vString} H ${pos.x + 150 + 90}`}
                                fill={'none'} stroke={treeConfig.path.color}
                                strokeWidth={treeConfig.path.strokeWidth}/>}
                        </g>
                    )
                }) : null}
            </g>
        </svg>
    )
};

export default Bracket;
