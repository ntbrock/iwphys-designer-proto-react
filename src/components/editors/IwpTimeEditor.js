import React from 'react';
import update from "immutability-helper";

/**
 * Edit Author information
 */
export default class IwpTimeEditor extends React.Component {

    constructor(props) {
        super(props);

        const time = props.animation.objects.filter( (o) => o.objectType === "time" )[0]


        this.state = {
            time: time
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);

    }

    /** TODO Handle Field Changes Generically */
    onFieldChange(event) {
        let feature = event.target.attributes['feature'].value;
        let value = event.target.value;

        console.log("IwpTimeEditor:29> feature: " , feature, "  value:", value);

        this.setState( { time : update(this.state.time, {[feature]: {$set: value}}) } );

        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.time."+feature, value )
        }
    }



    render() {
        return (
            <div className="iwp-time-editor">

                <h3>Time</h3>
                <div>
                    <div className="iwp-time-editor-field">
                        <label>Start</label>
                        <input type="text"
                               value={this.state.time.start}
                               readOnly={false}
                               feature="start"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-time-editor-field">
                        <label>Stop</label>
                        <input type="text"
                               value={this.state.time.stop}
                               readOnly={false}
                               feature="stop"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-time-editor-field">
                        <label>Change</label>
                        <input type="text"
                               value={this.state.time.change}
                               readOnly={false}
                               feature="change"
                               onChange={this.onFieldChange}/>
                    </div>


                    <div className="iwp-time-editor-field">
                        <label>Fps</label>
                        <input type="text"
                               value={this.state.time.fps}
                               readOnly={false}
                               feature="fps"
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}