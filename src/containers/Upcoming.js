import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EventList from '../components/EventList';

function mapStateToProps(state) {
    return {
        events: state.events
    }
}

class UpcomingComponent extends Component {
    render() {
        return (
            <LinearGradient colors={['#F7F7F7', '#D7D7D7']} style={styles.container}>
                <EventList events={this.props.events} />
            </LinearGradient>
        );
    }
}

UpcomingComponent.propTypes = {
    events: PropTypes.array.isRequired
};

const styles = {
    container: {
        flex: 1
    }
}

export default connect(mapStateToProps)(UpcomingComponent);
