import { Tab, Tabs } from "react-bootstrap"

export const ResearchTabs = ():JSX.Element => {
    return (
        <Tabs
            defaultActiveKey="players"
            id="research-tab-select"
            justify
            variant="pills"
        >
            <Tab eventKey="players" title="Players">
                Players
            </Tab>
            <Tab eventKey="teams" title="Teams">
                Teams
            </Tab>
            <Tab eventKey="compare" title="Compare">
                Compare
            </Tab>
        </Tabs>
    )
}