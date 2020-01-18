import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Modal from "react-responsive-modal";
import * as websiteAction from "../../../actions/websiteAction";
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import {isLoggedIn} from '../../../index';
import './ProductList.css';
import {browserHistory} from "react-router";

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            selectedProduct: null,
            selectedProductTeamMember: null
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillMount() {
        if (this.props.serviceList.length <= 0) {
            this.props.actions.websiteAction.getWebsiteHome();
        }
        this.props.actions.websiteAction.getAllProducts();
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
        window.scrollTo(0, 0);
    };

    DialogClose = () => {
        this.setState({isDialogOpen: false});
    };

    DialogOpen = (productId, service_id) => {
        const Service = this.props.AllProductsList.AllProducts.find((data) => data.service_id === service_id);
        const Product = Service.products.find((data) => data.id === productId);
        this.setState({isDialogOpen: true, selectedProduct: Product, selectedProductTeamMember: null});
    };

    SelectTeamMember = (TeamMemberId) => {
        this.setState({selectedProductTeamMember: TeamMemberId});
    };

    VisibleButton = () => {
        //Todo step - check login -> check select or not -> visible button
        const {selectedProductTeamMember} = this.state;
        if (isLoggedIn() && selectedProductTeamMember !== null)
            return true;
        else
            return false;
    };

    AddCart = () => {
        const {selectedProduct, selectedProductTeamMember} = this.state;
        this.props.actions.websiteAction.AddNewProductToCart(selectedProduct, selectedProductTeamMember);
        this.setState({isDialogOpen: false, selectedProduct: null, selectedProductTeamMember: null});
    };

    BasketClick = () => {
        browserHistory.push('/BasketItems');
    };

    render() {
        const {isDialogOpen} = this.state;
        const TeamList = [];
        this.state.selectedProduct && this.state.selectedProduct.teamMember.map((id) => {
            TeamList.push(this.props.teamList.find((data) => data.id === id));
        });
        const BasketProductCount = this.props.BasketGeneratorProducts && this.props.BasketGeneratorProducts.length;

        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>
                <NotificationSystem ref="notificationSystem"/>
                <Modal open={isDialogOpen} onClose={this.DialogClose}>
                    <h2>Simple centered modal</h2>
                    {TeamList.map((team, index) => (
                        <div className="col-xl-3 col-md-3 col-sm-6 col-12 team_position mt-3" key={index}
                             onClick={() => this.SelectTeamMember(team)}>
                            <div className="team">
                                <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url} alt="team1"
                                     className="img-fluid team_img"/>
                            </div>
                            <div className="team_text1">{team.first_name} {team.last_name}</div>
                        </div>
                    ))}

                    {this.VisibleButton() && <button onClick={this.AddCart}> Add Cart</button>}

                </Modal>

                <div className="d-flex align-items-center pl-md-3 service_menu">
                    {this.props.serviceList.map((singleService, i) => (
                        <a href={"#" + singleService.title} key={i}>{singleService.title}</a>
                    ))}
                </div>

                {this.props.AllProductsList.AllProducts && this.props.AllProductsList.AllProducts.map((singleService) => (
                    <div id={singleService.title} className="service_1" key={singleService.service_id}>
                        <div className="container">

                            <div className="title_space">
                                <span className="service_main_title">{singleService.title}</span>
                            </div>

                            <div className="row">
                                {singleService.products.map((singleProduct, i) => (
                                    <div className="col-md-4"
                                         key={i}
                                         onClick={() => this.DialogOpen(singleProduct.id, singleProduct.service_id)}>
                                        <div className="service_box">
                                            {singleProduct.offerPrice > 0 &&
                                            <div id="pointer"><span className="shape_text">Offer Price.</span></div>}
                                            <div>
                                                <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.image_url}
                                                     className="img-fluid"
                                                     alt="service1" style={{height: '50px', width: '50px'}}/>
                                                <span className="service_title ml-md-3">{singleProduct.title}</span>
                                            </div>
                                            <div className="price">
                                                {singleProduct.offerPrice > 0 &&
                                                <strike className="price1">{singleProduct.offerPrice}</strike>}
                                                <span className="price2">{singleProduct.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {BasketProductCount > 0 && <div id="ex3" onClick={this.BasketClick}>
                    <span className="p1 fa-stack fa-5x has-badge" data-count={BasketProductCount}>
                    <i className="p2 fa fa-circle fa-stack-2x"></i>
                    <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" data-count="5"></i>
                    </span>
                </div>}
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        AllProductsList: websiteReducer.AllProductsList,
        serviceList: websiteReducer.serviceList,
        teamList: websiteReducer.teamList,
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);