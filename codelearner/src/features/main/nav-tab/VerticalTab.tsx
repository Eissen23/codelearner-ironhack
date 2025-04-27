export interface VerticalTabProps {
    key: string;
    element: React.ReactNode;
}

const DefaultTabItems: VerticalTabProps[] = [
    {   
        key: 'tab1',
        element: <div>Tab 1</div>
    },
    {
        key: 'tab2',
        element: <div>Tab 2</div>
    }
]

const VerticalTab = ({tabItems = DefaultTabItems, activeTab = tabItems[0].key}: {tabItems: VerticalTabProps[], activeTab: string|null}) => {


    const renderTabContent = ({activeTab }: {activeTab: string|null}) => {
        const activeTabItem = tabItems.find(tab => tab.key === activeTab);
        return activeTabItem ? activeTabItem.element : null;
    };

    return (
        <div className="mt-3">
            {renderTabContent({activeTab})}
        </div>
    );
};

export default VerticalTab;

