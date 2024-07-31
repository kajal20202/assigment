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
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Movie</Button>
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
                                                                            <i className="ri-star-fill fs-14"></i>
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                                <UncontrolledDropdown className="col text-end">
                                                                    <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
                                                                        <i className="ri-more-fill fs-17"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu end>
                                                                        <DropdownItem className="dropdown-item edit-list" href="#addmemberModal" onClick={() => handleTeamClick(item)}>
                                                                            <i className="ri-pencil-line me-2 align-bottom text-muted"></i>Edit
                                                                        </DropdownItem>
                                                                        <DropdownItem className="dropdown-item remove-list" href="#removeMemberModal" onClick={() => onClickData(item)}>
                                                                            <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>Remove
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={4} className="col">
                                                            <div className="team-profile-img">
                                                                <div className="avatar-lg img-thumbnail square-image flex-shrink-0">
                                                                    {item.userImage != null ?
                                                                        <img src={item.userImage} alt="" className="img-fluid d-block square-image" />
                                                                        :
                                                                        <div className="avatar-title text-uppercase border square-image bg-light text-primary">
                                                                            {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                                                        </div>}
                                                                </div>
                                                                <div className="team-content">
                                                                    <Link to="#" onClick={() => { setIsOpen(!isOpen); setSideBar(item); }}>
                                                                        <h5 className="fs-16 mb-1">{item.name}</h5>
                                                                    </Link>
                                                                    <p className="text-muted mb-0">{item.designation}</p>
                                                                </div>
                                                            </div>
                                                        </Col>


                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}


                                </Row>

                                <div className="modal fade" id="addmembers" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <Modal isOpen={modal} toggle={toggle} centered>
                                            <ModalBody>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>
                                                    <Row>
                                                        <Col lg={12}>

                                                            <input type="hidden" id="memberid-input" className="form-control" defaultValue="" />
                                                            <div className="px-1 pt-1">
                                                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                                                    <img src={smallImage9} alt="" id="cover-img" className="img-fluid" />

                                                                    <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="modal-title text-white" id="createMemberLabel">{!isEdit ? "Add New Movie" : "Edit Member"}</h5>
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <div className="d-flex gap-3 align-items-center">
                                                                                <div>
                                                                                    <label htmlFor="cover-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Select Cover Image">
                                                                                        <div className="avatar-xs">
                                                                                            <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                                <i className="ri-image-fill"></i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </label>
                                                                                    <input className="form-control d-none" defaultValue="" id="cover-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                                </div>
                                                                                <button type="button" className="btn-close btn-close-white" onClick={() => setModal(false)} id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center mb-4 mt-n5 pt-2">
                                                                <div className="position-relative d-inline-block">
                                                                    <div className="position-absolute bottom-0 end-0">
                                                                        <label htmlFor="member-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Member Image">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                    <i className="ri-image-fill"></i>
                                                                                </div>
                                                                            </div>
                                                                        </label>
                                                                        <input className="form-control d-none" defaultValue="" id="member-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                    </div>
                                                                    <div className="avatar-lg">
                                                                        <div className="avatar-title bg-light rounded-circle">
                                                                            <img src={userdummyimg} alt=" " id="member-img" className="avatar-md rounded-circle h-auto" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <Label htmlFor="teammembersName" className="form-label">Movie Name</Label>
                                                                <Input type="text" className="form-control" id="teammembersName" placeholder="Enter movie name"
                                                                    name='name'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.name || ""}
                                                                    invalid={
                                                                        validation.touched.name && validation.errors.name ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.name && validation.errors.name ? (
                                                                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="designation" className="form-label">Release Year</Label>
                                                                <Input type="text" className="form-control" id="designation" placeholder="Enter movie release year" name='designation'
                                                                    validate={{
                                                                        required: { value: true },
                                                                    }}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.designation || ""}
                                                                    invalid={
                                                                        validation.touched.designation && validation.errors.designation ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.designation && validation.errors.designation ? (
                                                                    <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="button" className="btn btn-light" onClick={() => setModal(false)}>Close</button>
                                                                <button type="submit" className="btn btn-success" id="addNewMember">{!isEdit ? "Add Movie" : "Save"}</button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>

                            </div>
                            <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "72px", height: "72px" }}></lord-icon>
                                <h5 className="mt-4">Sorry! No Result Found</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Team;