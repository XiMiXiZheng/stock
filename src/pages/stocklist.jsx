import React from "react";
import { Tabs, Table } from "antd";
import jsonResponse from "./json/20190403.json";
import { groupBy } from "lodash";

export default class StockList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      industries: []
    };
  }

  componentDidMount() {
    this.setup();
  }

  columns = [
    {
      title: "股票代码",
      dataIndex: "stockId",
      width: 100
    },
    {
      title: "股票名称",
      dataIndex: "stockName",
      width: 100
    },
    {
      title: "行业",
      dataIndex: "industry",
      width: 100
    },
    {
      title: "PE(TTM)",
      dataIndex: "pe",
      sorter: (a, b) => a.pe - b.pe,
      sortDirections: ["descend", "ascend"],
      width: 100
    },
    {
      title: "ROE(摊薄)",
      dataIndex: "ROE",
      sorter: (a, b) => a.ROE - b.ROE,
      sortDirections: ["descend", "ascend"],
      width: 100
    },
    {
      title: "ROE(加权平均)",
      dataIndex: "ROEW",
      sorter: (a, b) => a.ROEW - b.ROEW,
      sortDirections: ["descend", "ascend"],
      width: 100
    }
  ];

  setup = () => {
    this.setState({
      industries: groupBy(jsonResponse.data, stock => stock.industry)
    });
  };

  renderTabItem = () => {
    let tabItems = [];
    for (const industry in this.state.industries) {
      tabItems.push(
        <Tabs.TabPane
          key={industry}
          tab={industry}
          style={{
            height: "calc(100vh - 45px)"
          }}
        >
          {this.renderTable(industry, this.state.industries[industry])}
        </Tabs.TabPane>
      );
    }
    return tabItems;
  };

  renderTable = (industry, stocks) => {
    return (
      <Table
        columns={this.columns}
        dataSource={stocks}
        pagination={false}
        scroll={{ y: document.body.clientHeight - 150 }}
      />
    );
  };

  render() {
    return (
      <div
        style={{
          height: "calc(100vh - 0px)",
          overflow: "hidden"
        }}
      >
        <Tabs>{this.renderTabItem()}</Tabs>
      </div>
    );
  }
}
