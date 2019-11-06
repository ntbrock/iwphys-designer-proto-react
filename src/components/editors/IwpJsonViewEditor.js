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

        let d = diffs.map ( (d,i) => {

            console.log("IwpJsonViewEditor:29> Diff: ", d );

            const p = d.path.join(".");
            return (
                <li key={i}>{p} : {JSON.stringify(d)}</li>
            );
        });
        if ( d.length === 0 ) { d = (<li key={0}>Zero Differences</li>)}

        return (
            <div className="iwp-json-viewer">
                <h3>Json Diffs</h3>

                {d}

                <h3>JSON Viewer</h3>
                <textarea style={{width: '100%', height: '550px'}} defaultValue={JSON.stringify(this.props.animation)}>

                </textarea>
            </div>

        )
    }
}