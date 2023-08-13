export default {
    API_URL: process.env.REACT_APP_DEBUG ? "https://collabtime-backend.onrender.com" : 'http://localhost:4000/',
    FEATURES: ['Events']
}

export const links = {
    "/events": "Events",
    "/participants": "Participants",
}

export const linkIcons = [
    "CalendarOutlined",
    "BorderOutlined"
]