import { Tab, Tabs } from "react-bootstrap"
import { LeagueTable } from "../Tables/LeagueTable/LeagueTable"
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
                <LeagueTable/>
            </Tab>
            <Tab eventKey="compare" title="Compare">
                Compare
            </Tab>
        </Tabs>
    )
}