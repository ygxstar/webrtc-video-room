import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Initialize default settings on first load (only in browser)
if (typeof window !== 'undefined') {
  if (localStorage.getItem('autoAccept') === null) {
    localStorage.setItem('autoAccept', 'true');
  }
  if (localStorage.getItem('skipInvite') === null) {
    localStorage.setItem('skipInvite', 'true');
  }
  // Debug: log current settings
  console.log('[WebRTC] Settings:', {
    autoAccept: localStorage.getItem('autoAccept'),
    skipInvite: localStorage.getItem('skipInvite')
  });
}

const Home = props =>
  <div className="home">
    <div>
      <h1 itemProp="headline">Webrtc Video Room</h1>
      <p>Please enter a room name.</p>
        <div className="auto-connect">
          <label>
            <input
              type="checkbox"
              id="autoAccept"
              defaultChecked={typeof window !== 'undefined' ? (localStorage.getItem('autoAccept') === 'true') : true}
              onChange={e => { if (typeof window !== 'undefined') localStorage.setItem('autoAccept', String(e.target.checked)); }}
            />
            &nbsp;Auto-accept incoming invitations
          </label>
        </div>
        <div className="auto-connect">
          <label>
            <input
              type="checkbox"
              id="skipInvite"
              defaultChecked={typeof window !== 'undefined' ? (localStorage.getItem('skipInvite') === 'true') : true}
              onChange={e => { if (typeof window !== 'undefined') localStorage.setItem('skipInvite', String(e.target.checked)); }}
            />
            &nbsp;Skip invitation message (auto "hello")
          </label>
        </div>
      <input type="text" name="room" value={ props.roomId } onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
      <Link className="primary-button" to={ '/r/' + props.roomId }>Join</Link>
      <Link className="primary-button" to={ '/r/' + props.defaultRoomId }>Random</Link>
      { props.rooms.length !== 0 && <div>Recently used rooms:</div> }
      { props.rooms.map(room => <Link key={room} className="recent-room" to={ '/r/' + room }>{ room }</Link>) }
      {typeof window !== 'undefined' && <div className="debug-settings" style={{marginTop: '2ex', fontSize: '0.9em', color: '#999'}}>
        <span>autoAccept: {localStorage.getItem('autoAccept')} | skipInvite: {localStorage.getItem('skipInvite')}</span>
      </div>}
    </div>
  </div>;

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};

const mapStateToProps = store => ({rooms: store.rooms});

export default connect(mapStateToProps)(Home);