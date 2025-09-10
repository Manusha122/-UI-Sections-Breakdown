import React from 'react';
import { useStore } from '../store';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export default function BorrowerPipeline() {
  const pipeline = useStore(s => s.pipeline);
  const setActive = useStore(s => s.setActive);
  const [activeTab, setActiveTab] = React.useState('all');

  const pipelineCategories = [
    // { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'inProgress', label: 'Review' },
    { id: 'approved', label: 'Approved' }
  ];

  const getBorrowers = (category: string) => {
    return pipeline[category as keyof typeof pipeline] || [];
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'in progress':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'approved':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getInitialsColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-emerald-100 text-emerald-700',
      'bg-purple-100 text-purple-700',
      'bg-amber-100 text-amber-700',
      'bg-rose-100 text-rose-700',
      'bg-indigo-100 text-indigo-700'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Card className="p-6 shadow-sm border border-gray-200 rounded-xl bg-white" data-testid="pipeline">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900">Pipeline</h2>
        <div className="flex-1"></div>
        <div className="text-sm text-gray-500">
          Total: {getBorrowers('all').length} borrowers
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex h-auto p-1 bg-gray-100 rounded-lg mb-6">
          {pipelineCategories.map((category) => {
            const count = getBorrowers(category.id).length;
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                  data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm
                  data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600
                  data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-200/50
                  whitespace-nowrap"
              >
                <span>{category.label}</span>
                {category.id !== 'all' && count > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-semibold rounded-full
                    data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600
                    data-[state=inactive]:bg-gray-300 data-[state=inactive]:text-gray-600">
                    {count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {pipelineCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="space-y-3">
              {getBorrowers(category.id).length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No borrowers in this category</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
                </div>
              ) : (
                getBorrowers(category.id).map((borrower: any) => (
                  <div
                    key={borrower.id}
                    data-testid={`borrower-item-${borrower.id}`}
                    className="flex items-start gap-4 p-4 cursor-pointer group rounded-lg border border-gray-200
                      hover:border-blue-300 hover:shadow-sm transition-all duration-200 hover:bg-blue-50/30
                      active:scale-[0.99] active:shadow-inner bg-white"
                    onClick={() => setActive(borrower)}
                  >
                    {/* Avatar Circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                      group-hover:scale-105 transition-transform duration-200 ${getInitialsColor(borrower.name)}`}>
                      {borrower.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    
                    {/* Borrower Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900 text-base truncate">{borrower.name}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                              bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                              ${borrower.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 font-medium mb-2">{borrower.loan_type}</div>
                        </div>
                      </div>
                      
                      {/* Status and Progress */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(borrower.status)}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
                          {borrower.status}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}