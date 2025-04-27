// import { Col, Row } from "react-bootstrap";
// import VerticalTab from "./VerticalTab";
// import VerticalNav from "./VerticalNav";
// import { useState } from "react";
// import { VerticalTabProps } from "./VerticalTab";
// import { NavLink } from "../../../types/nav.type";

// const DefaultNavItems: NavLink[] = [
//     {
//         label: 'Tab 1',
//         href: '/tab1',
//         key: 'tab1',
//     },
//     {
//         label: 'Tab 2',
//         href: '/tab2',
//         key: 'tab2',
//     },
//     {
//         label: 'Tab 3',
//         href: '/tab3',
//         key: 'tab3',
//     }
// ]
// const Test = () => {
//     const [activeTab, setActiveTab] = useState<string|null>(null);
  
//     const handleSelect = (selectedKey: string|null) => {
//         setActiveTab(selectedKey);
//     };
    
//     return (
//         <Row>
//             <Col>
//                 <VerticalNav navItems={DefaultNavItems} activeTab={activeTab} onSelect={handleSelect} />
//             </Col>
//             <Col>
//                 <VerticalTab tabItems={DefaultNavItems} activeTab={activeTab} />
//             </Col>
//         </Row>
//     );
// };

// export default Test;
