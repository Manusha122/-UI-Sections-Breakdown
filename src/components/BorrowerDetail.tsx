import React from 'react';
import { useStore } from '../store';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "./ui/alert";
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export default function BorrowerDetail() {
  const active = useStore(s => s.active);
  const escalateToCommittee = useStore(s => s.escalateToCommittee);
  const [isAICollapsed, setIsAICollapsed] = React.useState(false);

  if (!active) return (
    <Card className="p-6 min-h-[200px] flex items-center justify-center border-dashed border-2">
      <div data-testid="borrower-empty" className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-lg font-medium text-gray-600">Select a borrower</div>
        <div className="text-sm text-gray-400">Choose a borrower from the pipeline to view details</div>
      </div>
    </Card>
  );

  // Mock AI flags for demo
  const aiFlags = [
    { type: 'warning', message: 'Inconsistent income documentation' },
    { type: 'info', message: 'Multiple recent credit inquiries' },
    { type: 'error', message: 'DTI ratio exceeds policy limit' }
  ];

  // Mock logic for enabling escalation
  const canEscalate = aiFlags.some(flag => flag.type === 'error');

  return (
    <div className="space-y-6" data-testid="borrower-detail">
      <Card className="p-6">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">{active.name}</h2>
            <div className="text-sm text-muted-foreground">
              {active.email} • {active.phone}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">
              ${active.loan_amount?.toLocaleString?.() ?? active.amount}
            </div>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-yellow-500 text-white">
              {active.status}
            </div>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loan Summary
          </h3>
          <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
            <div className="space-y-1">
              <div className="text-sm font-medium text-blue-600">Employment</div>
              <div className="text-lg text-gray-800">{active.employment || 'N/A'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-blue-600">Existing Loan</div>
              <div className="text-lg text-gray-800">${active.existing_loan?.toLocaleString() || '0'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-blue-600">Credit Score</div>
              <div className="text-lg text-gray-800">{active.credit_score || 'N/A'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-blue-600">Source of Funds</div>
              <div className="text-lg text-gray-800">{active.source_of_funds || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* AI Explainability Section */}
        <div className="mt-6">
          <button
            onClick={() => setIsAICollapsed(!isAICollapsed)}
            className="flex items-center gap-2 font-semibold mb-4"
            data-testid="ai-explainability-toggle"
          >
            <span>AI Explainability</span>
            {isAICollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {!isAICollapsed && (
            <div className="space-y-3" data-testid="ai-explainability-content">
              {aiFlags.map((flag, index) => (
                <Alert 
                  key={index} 
                  variant={flag.type === 'error' ? 'destructive' : 'default'}
                  className="mb-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Risk Factor</AlertTitle>
                  <AlertDescription>{flag.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {active.risk_signal && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded">
              {active.risk_signal}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 max-w-3xl mx-auto w-full">
          <Button 
            className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200" 
            onClick={() => alert('Documents requested')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Request Documents
          </Button>
          <Button 
            className="w-full sm:flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200" 
            onClick={() => alert('Sent to valuer')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Send to Valuer
          </Button>
          <Button 
            className="w-full sm:flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 shadow-md hover:shadow-lg transition-all duration-200" 
            disabled={!canEscalate}
            onClick={escalateToCommittee}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Escalate to Committee
          </Button>
        </div>
      </Card>
    </div>
  );
}
