import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';
import './TeamListModelStyle.css';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    },
    actionsContainerStyle: {
        textAlign: 'right',
        padding: '5 5'
    },
    leftCloseButton: {
        borderRadius: '50%',
        boxShadow: '0px 2px 9px -2px #000',
        float: 'right',
        backgroundColor: '#fff',
        width: 43,
        height: 43,
        fontSize: 25,
        fontFamily: 'FontAwesome',
        color: '#c53140',
        marginTop: '-6px',
        padding: "9px 12px"
    }
};


class TeamListModel extends Component {

    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.props.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div>
                        <div>
                            <div className="modal-body">
                                <div className="product">
                                    <div className="d-flex justify-content-center">
                                        <h4 className="p-2">Product</h4>
                                        <i className="fa fa-close"></i>
                                    </div>
                                    <div className="products p-2">
                                        {this.props.TeamList.map((team, index) => (
                                            <div className="product_details d-flex align-items-center p-2 m-2" onClick={() => this.props.SelectTeamMember(team)} key={index}>
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url}>
                                                    <img className="img-fluid" alt="team1"/>
                                                    <img src="/assets/Images/NoImages.png" alt="team1" className="img-fluid"/>
                                                    <img src="/assets/Images/s_loader.gif" alt="team1" className="img-fluid"/>
                                                </ImageLoader>
                                                <h5 className="ml-2">{team.first_name} {team.last_name}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {this.props.VisibleButton() && <button onClick={this.props.AddCart}> Add Cart</button>}
                                <button onClick={this.props.handleClose}> Close</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default TeamListModel;