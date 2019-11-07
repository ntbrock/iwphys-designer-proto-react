import React from 'react';

import diff from 'deep-diff';

/**
 * JsonViewer
 */

export default class IwpJsonViewEditor extends React.Component {

    constructor(props) {
        super(props);
        // this.state = { animation: props.animation };
        if ( ! props.animation ) { throw Error("Missing Prop: 'animation'")}
        if ( ! props.animationZero ) { throw Error("Missing Prop: 'animationZero'")}
    }

    // Card Mode
    render() {

        // Compare animation-vs-animationZero

        const diffs = diff(this.props.animationZero, this.props.animation) || [];

        console.log("IwpJsonViewEditor:25> Diffs: ", diffs );

        let diffRows = diffs.map ( (d,i) => {

            console.log("IwpJsonViewEditor:29> Diff: ", d );

            const p = d.path.join(".");
            return (
                <tr key={i}>
                    <td>{d.kind}</td>
                    <td>{p}</td>
                    <td style={{color: "red"}}>{JSON.stringify(d.lhs)}</td>
                    <td style={{color: "green"}}>{JSON.stringify(d.rhs)}</td>
                </tr>
            );
        });

        let diffTable = (
            <table className="iwp-json-diff-table">
                <tbody>
                <tr>
                    <td>T</td>
                    <td>Path</td>
                    <td>Was</td>
                    <td>Now</td>
                </tr>
                {diffRows}
                </tbody>
            </table>
        );
        if ( diffs.length === 0 ) { diffTable = (<li key={0}>Zero Differences</li>)}

        return (
            <div className="iwp-json-viewer">
                <h3>Json Diffs</h3>

                {diffTable}
                <br/>

                <h3>JSON Viewer</h3>
                <textarea readOnly={true} style={{width: '100%', height: '550px', padding: "0.5rem"}} defaultValue={JSON.stringify(this.props.animation, null, 2)}>

                </textarea>
            </div>

        )
    }
}