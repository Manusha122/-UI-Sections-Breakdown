import React from 'react';
import Layout from '../../components/Layout';
import BorrowerPipeline from '../../components/BorrowerPipeline';
import BorrowerDetail from '../../components/BorrowerDetail';
import BrokerOverview from '../../components/Broker';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 p-3 lg:p-6">
        {/* Left Panel - Borrower Pipeline */}
        <div className="lg:col-span-3 order-1">
          <div className="h-full sticky top-6">
            <BorrowerPipeline />
          </div>
        </div>
        
        {/* Center Panel - Borrower Detail */}
        <div className="lg:col-span-6 order-3 lg:order-2">
          <div className="space-y-4">
            <BorrowerDetail />
          </div>
        </div>
        
        {/* Right Panel - Broker Overview */}
        <div className="lg:col-span-3 order-2 lg:order-3">
          <div className="h-full sticky top-6">
            <BrokerOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
