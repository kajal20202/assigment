// Import Images
import smallImage1 from '../../assets/images/small/img-1.jpg';
import smallImage2 from '../../assets/images/small/img-2.jpg';
import smallImage3 from '../../assets/images/small/img-3.jpg';
import smallImage4 from '../../assets/images/small/img-4.jpg';
import smallImage5 from '../../assets/images/small/img-5.jpg';
import smallImage6 from '../../assets/images/small/img-6.jpg';
import smallImage7 from '../../assets/images/small/img-7.jpg';
import smallImage8 from '../../assets/images/small/img-8.jpg';
import smallImage9 from '../../assets/images/small/img-9.jpg';
import smallImage10 from '../../assets/images/small/img-10.jpg';
import smallImage11 from '../../assets/images/small/img-11.jpg';
import smallImage12 from '../../assets/images/small/img-12.jpg';

//User Images
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../assets/images/users/avatar-3.jpg';
import avatar5 from '../../assets/images/users/avatar-5.jpg';
import avatar4 from '../../assets/images/users/avatar-4.jpg';
import avatar6 from '../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';

const gallery = [
    {
        id: 1,
        img: smallImage1,
        title: "Glasses and laptop from above",
        auther: "Ron Mackie",
        likes: "2.2K",
        comments: "1.3K",
        category: "Project"
    },
    {
        id: 2,
        img: smallImage2,
        title: "Working at a coffee shop",
        auther: "KINGDOM PLANET APES",
        likes: "2.2K",
        comments: "1.3K",
        category: "Project"
    },
    {
        id: 3,
        img: smallImage3,
        title: "Photo was taken in Beach",
        auther: "Elwood Arter",
        likes: "2.2K",
        comments: "1.3K",
        category: "Project"
    },
    {
        id: 4,
        img: smallImage4,
        title: "Drawing a sketch",
        auther: "Jason McQuaid",
        likes: "2.2K",
        comments: "1.3K",
        category: "Project"
    },
    {
        id: 5,
        img: smallImage5,
        title: "Working from home little spot",
        auther: "Taps",
        likes: "2.2K",
        comments: "1.3K",
        category: "Project"
    },
    {
        id: 6,
        img: smallImage6,
        title: "Glasses and laptop from above",
        auther: "Erica Kernan",
        likes: "2.2K",
        comments: "1.3K",
        category: "Designing"
    },
    {
        id: 7,
        img: smallImage7,
        title: "Sunrise above a beach",
        auther: "James Ballard",
        likes: "2.2K",
        comments: "1.3K",
        category: "Development"
    },
    {
        id: 8,
        img: smallImage8,
        title: "Project discussion with team",
        auther: "Ruby Griffin",
        likes: "2.2K",
        comments: "1.3K",
        category: "Designing"
    },
    {
        id: 9,
        img: smallImage9,
        title: "Dramatic clouds at the Golden Gate Bridge",
        auther: "Ron Mackie",
        likes: "2.2K",
        comments: "1.3K",
        category: "Photography"
    },
    {
        id: 10,
        img: smallImage10,
        title: "Fun day at the Hill Station",
        auther: "Taps",
        likes: "2.2K",
        comments: "1.3K",
        category: "Development"
    },
    {
        id: 11,
        img: smallImage11,
        title: "Cycling in the countryside",
        auther: "KINGDOM PLANET APES",
        likes: "2.2K",
        comments: "1.3K",
        category: "Designing"
    },
    {
        id: 12,
        img: smallImage12,
        title: "A mix of friends and strangers heading off to find an adventure.",
        auther: "Erica Kernan",
        likes: "2.2K",
        comments: "1.3K",
        category: "Designing"
    },
    {
        id: 13,
        img: smallImage8,
        title: "Project discussion with team",
        auther: "Ruby Griffin",
        likes: "2.2K",
        comments: "1.3K",
        category: "Photography"
    },
];

const SearchGallery = [
    {
        id: 1,
        img: smallImage1,
        title: "Glasses and laptop from above",
        auther: "Ron Mackie",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 2,
        img: smallImage2,
        title: "Working at a coffee shop",
        auther: "KINGDOM PLANET APES",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 3,
        img: smallImage3,
        title: "Photo was taken in Beach",
        auther: "Elwood Arter",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 4,
        img: smallImage4,
        title: "Drawing a sketch",
        auther: "Jason McQuaid",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 5,
        img: smallImage5,
        title: "Working from home little spot",
        auther: "Taps",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 6,
        img: smallImage6,
        title: "Glasses and laptop from above",
        auther: "Erica Kernan",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 7,
        img: smallImage7,
        title: "Sunrise above a beach",
        auther: "James Ballard",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 8,
        img: smallImage8,
        title: "Project discussion with team",
        auther: "Ruby Griffin",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 9,
        img: smallImage9,
        title: "Dramatic clouds at the Golden Gate Bridge",
        auther: "Ron Mackie",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 10,
        img: smallImage10,
        title: "Fun day at the Hill Station",
        auther: "Taps",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 11,
        img: smallImage11,
        title: "Cycling in the countryside",
        auther: "KINGDOM PLANET APES",
        likes: "2.2K",
        comments: "1.3K"
    },
    {
        id: 12,
        img: smallImage12,
        title: "A mix of friends and strangers heading off to find an adventure.",
        auther: "Erica Kernan",
        likes: "2.2K",
        comments: "1.3K"
    },

];
const team = [
    {
        id: 1,
        backgroundImg: smallImage9,
        userImage: avatar2,
        name: "KINGDOM PLANET APES",
        designation: "1981",

    },
    {
        id: 2,
        backgroundImg: smallImage12,
        userImage: null,
        userShortName: "HB",
        name: "Taps",
        designation: "1981",

    },
    {
        id: 3,
        backgroundImg: smallImage11,
        userImage: avatar3,
        name: "ONWORD",
        designation: "1984",

    },
    {
        id: 4,
        backgroundImg: smallImage1,
        userImage: avatar8,
        name: "Losin' It",
        designation: "1982",

    },
    {
        id: 5,
        backgroundImg: smallImage10,
        userImage: null,
        userShortName: "ME",
        name: "All the Right Moves",
        designation: "1983",

    },
    {
        id: 6,
        backgroundImg: smallImage2,
        userImage: avatar4,
        name: "Risky Business",
        designation: "1983",

    },
    {
        id: 7,
        backgroundImg: smallImage4,
        userImage: null,
        userShortName: "NC",
        name: "Legend",
        designation: "1985",
        projectCount: 352,

    },
    {
        id: 8,
        backgroundImg: smallImage7,
        userImage: avatar6,
        name: "JTop Gun.",
        designation: "1986",

    },
    {
        id: 9,
        backgroundImg: smallImage3,
        userImage: avatar5,
        name: "Magnolia",
        designation: "18985",
    },
    {
        id: 10,
        backgroundImg: smallImage5,
        userImage: null,
        userShortName: "DP",
        name: "Donald Palmer",
        designation: "1978",

    },
    {
        id: 11,
        backgroundImg: smallImage8,
        userImage: avatar7,
        name: "A Few Good Men",
        designation: "1995",

    },
    {
        id: 12,
        backgroundImg: smallImage6,
        userImage: null,
        userShortName: "MW",
        name: "Marie Ward",
        designation: "1987",

    },

];

export { gallery, SearchGallery, team };