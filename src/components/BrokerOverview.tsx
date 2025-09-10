import React from 'react'

export default function BrokerOverview(){
  const broker = {name: 'Robert Turner', deals:16, approval_rate: '75%', pending: 7660}

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{broker.name}</div>
          <div className="text-sm text-gray-500">Broker</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{broker.deals}</div>
          <div className="text-xs text-gray-500">Deals</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xl font-bold">{broker.deals}</div>
          <div className="text-xs text-gray-500">Deals</div>
        </div>
        <div>
          <div className="text-xl font-bold">{broker.approval_rate}</div>
          <div className="text-xs text-gray-500">Approval</div>
        </div>
        <div>
          <div className="text-xl font-bold">${broker.pending}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 bg-blue-100 rounded">Call</button>
        <button className="px-3 py-1 bg-blue-100 rounded">Email</button>
        <button className="px-3 py-1 bg-blue-100 rounded">Chat</button>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Onboarding Workflow</h4>
        <ol className="list-decimal ml-5 mt-2 text-sm">
          <li>Deal Intake</li>
          <li>IDV & Credit Check</li>
          <li>Document Upload</li>
          <li>AI Validation</li>
          <li>Credit Committee</li>
          <li>Approval & Docs</li>
          <li>Funder Syndication</li>
        </ol>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" /> E Ardsassist
        </label>
      </div>
    </div>
  )
}
