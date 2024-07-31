import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, Row, UncontrolledDropdown, FormFeedback } from 'reactstrap';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';

//User Images
import userdummyimg from '../../../assets/images/users/user-dummy-img.jpg';

//Small Images
import smallImage9 from '../../../assets/images/small/img-9.jpg';
//redux
import { useSelector, useDispatch } from 'react-redux';

//import action
import {
    getTeamData as onGetTeamData,
    deleteTeamData as onDeleteTeamData,
    addTeamData as onAddTeamData,
    updateTeamData as onUpdateTeamData
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from 'reselect';

const Team = () => {
    document.title = "Team | Velzon - React Admin & Dashboard Template";

    const dispatch = useDispatch();


    const selectteamData = createSelector(
        (state) => state.Team.teamData,
        (teamData) => teamData
    );
    // Inside your component
    const teamData = useSelector(selectteamData);

    const [team, setTeam] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [teamList, setTeamlist] = useState([]);

    //Modal  
    const [teamMem, setTeamMem] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(onGetTeamData());
    }, [dispatch]);

    useEffect(() => {
        setTeam(teamData);
        setTeamlist(teamData);
    }, [teamData]);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTeamMem(null);
        } else {
            setModal(true);
        }
    }, [modal]);

    // Update To do
    const handleTeamClick = useCallback((arg) => {
        const teamMem = arg;
        setTeamMem({
            id: teamMem.id,
            name: teamMem.name,
            designation: teamMem.designation,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Add To do
    const handleTeamClicks = () => {
        setTeamMem("");
        setModal(!modal);
        setIsEdit(false);
        toggle();
    };

    // delete
    const onClickData = (team) => {
        setTeam(team);
        setDeleteModal(true);
    };

    const handleDeleteTeamData = () => {
        if (team) {
            dispatch(onDeleteTeamData(team.id));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');
        for (let i = 0; i < buttonGroups.length; i++) {
            buttonGroups[i].addEventListener('click', onButtonGroupClick);
        }

        function onButtonGroupClick(event) {
            if (event.target.id === 'list-view-button' || event.target.parentElement.id === 'list-view-button') {
                document.getElementById("list-view-button").classList.add("active");
                document.getElementById("grid-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });

            } else {
                document.getElementById("grid-view-button").classList.add("active");
                document.getElementById("list-view-button").classList.remove("active");
                list.forEach(function (el) {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }
    }, []);

    const favouriteBtn = (ele) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    const searchList = (e) => {
        let inputVal = e.toLowerCase();

        const filterItems = (arr, query) => {
            return arr.filter((el) => {
                return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
        };

        let filterData = filterItems(teamData, inputVal);
        setTeamlist(filterData);
        if (filterData.length === 0) {
            document.getElementById("noresult").style.display = "block";
            document.getElementById("teamlist").style.display = "none";
        } else {
            document.getElementById("noresult").style.display = "none";
            document.getElementById("teamlist").style.display = "block";
        }
    };

    //OffCanvas  
    const [isOpen, setIsOpen] = useState(false);
    const [sideBar, setSideBar] = useState([]);


    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (teamMem && teamMem.name) || '',
            designation: (teamMem && teamMem.designation) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter movie Name"),
            designation: Yup.string().required("Please Enter Movie Release Year"),

        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateTeamData = {
                    id: teamMem ? teamMem.id : 0,
                    name: values.name,
                    designation: values.designation,
                    projectCount: values.projectCount,
                    taskCount: values.taskCount
                };
                // save edit Team data
                dispatch(onUpdateTeamData(updateTeamData));
                validation.resetForm();
            } else {
                const newTeamData = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    name: values.name,
                    designation: values.designation,
                    projectCount: 0,
                    taskCount: 0,
                    backgroundImg: smallImage9
                };
                // save new TeamData
                dispatch(onAddTeamData(newTeamData));
                validation.resetForm();
            }
            toggle();
        },
    });
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteTeamData()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <div className="search-box">
                                        <Input type="text" className="form-control" placeholder="Tom Curise Movies" onChange={(e) => searchList(e.target.value)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-sm-auto ms-auto">
                                    <div className="list-grid-nav hstack gap-1">
                                        <Button color="secondary" onClick={() => handleTeamClicks()}>
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Movie
                                        </Button>

                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Row>
                        <Col lg={12}>
                            <div id="teamlist">
                                <Row className="team-list grid-view-filter">
                                    {(teamList || []).map((item, key) => (
                                        <Col key={key}>
                                            <Card className="team-box">
                                                <div className="team-cover">
                                                    <img src={item.backgroundImg} alt="" className="img-fluid" />
                                                </div>
                                                <CardBody className="p-4">
                                                    <Row className="align-items-center team-row">
                                                        <Col className="team-settings">
                                                            <Row>
                                                                <Col>
                                                                    <div className="flex-shrink-0 me-2">
                                                                        <button type="button" className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn" onClick={(e) => favouriteBtn(e.target)}>
                                                                            <i className="ri-star-fill fs-16"></i>
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <UncontrolledDropdown direction='start'>
                                                                        <DropdownToggle tag="button" className="btn btn-light btn-icon rounded-circle btn-sm">
                                                                            <i className="ri-more-fill fs-17"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem onClick={() => handleTeamClick(item)}>
                                                                                <i className="ri-pencil-fill me-2 align-bottom text-muted"></i> Edit
                                                                            </DropdownItem>
                                                                            <DropdownItem onClick={() => onClickData(item)}>
                                                                                <i className="ri-forbid-2-fill me-2 align-bottom text-muted"></i> Delete
                                                                            </DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <div className="team-profile-img">
                                                        <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                                            {item.image_src ? <img src={item.image_src} alt="" className="img-fluid d-block rounded-circle" /> : <img src={userdummyimg} alt="" className="img-fluid d-block rounded-circle" />}
                                                        </div>
                                                        <div className="team-content">
                                                            <Link to="#" onClick={() => handleTeamClick(item)}>
                                                                <h5 className="fs-16 mb-1">{item.name}</h5>
                                                            </Link>
                                                            <p className="text-muted mb-0">{item.designation}</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <div className="py-4 text-center" id="noresult" style={{ display: "none" }}>
                                <div className="avatar-md mx-auto mb-4">
                                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                        <i className="ri-search-eye-line"></i>
                                    </div>
                                </div>
                                <h5 className="text-muted">Sorry! No Result Found</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Team;
