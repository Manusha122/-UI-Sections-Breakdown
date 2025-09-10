import React from 'react';
import { useStore } from '../store';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertTriangle, FileText, Home, CheckCircle, AlertOctagon } from "lucide-react";
import type { Borrower } from '../store/types';

export default function BorrowerDetail() {
  const active = useStore(s => s.active)
  const { requestDocuments, sendToValuer, approveLoan, escalateToCommittee } = useStore()
  const workflow = useStore(s => s.workflow)

  if(!active) return (
    <div data-testid="borrower-empty" className="p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center py-12 text-gray-500">
        Select a borrower to view details
      </div>
    </div>
  )

  return (
    <div data-testid="borrower-detail" className="bg-white rounded-xl shadow-lg border-0">
      {/* Header with Borrower Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{active.name}</h2>
              <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                New
              </span>
            </div>
            <div className="mt-2">
              <div className="text-sm text-gray-600">{active.loan_type}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${(active.loan_amount ?? active.amount)?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Loan Summary Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 text-lg">○</span>
            <h3 className="text-lg font-semibold text-gray-900">Loan Summary</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <dt className="text-sm text-gray-600">Employment</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{active.employment || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Existing Loan</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">${active.existing_loan?.toLocaleString() || '$0'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Credit Score</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{active.credit_score || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Source of Funds</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{active.source_of_funds || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* AI Risk Factors Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 text-lg">○</span>
            <h3 className="text-lg font-semibold text-gray-900">AI Explainability</h3>
          </div>
          <div className="space-y-4">
            {active.ai_flags?.map((flag:string, i:number) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-red-900">Risk Factor</div>
                  <div className="text-sm text-red-700">{flag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <Button
            size="lg"
            onClick={requestDocuments}
            className="w-full"
          >
            <FileText className="w-4 h-4" />
            Request Documents
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={sendToValuer}
            className="w-full"
          >
            <Home className="w-4 h-4" />
            Send to Valuer
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={escalateToCommittee}
            className="w-full"
          >
            <AlertOctagon className="w-4 h-4" />
            Escalate to Committee
          </Button>
        </div>
      </div>
    </div>
  )
}
