import React from 'react';
import { useStore } from '../store';
import { Toggle } from './ui/toggle';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';

export default function BrokerOverview() {
  const broker = useStore(s => s.broker)
  const workflow = useStore(s => s.workflow)
  const [aiAssistant, setAiAssistant] = React.useState(false)

  const BrokerContent = () => (
    <>
      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4" data-testid="broker-stats">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-0 hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-blue-600">{broker.deals}</div>
          <div className="mt-1 text-sm font-medium text-gray-600">Deals</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-emerald-50 to-blue-50 border-0 hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-emerald-600">{broker.approval_rate}</div>
          <div className="mt-1 text-sm font-medium text-gray-600">Approval</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-0 hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-indigo-600">${broker.pending}</div>
          <div className="mt-1 text-sm font-medium text-gray-600">Pending</div>
        </Card>
      </div>

      {/* Contact Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 max-w-3xl mx-auto w-full">
        <Button 
          variant="outline" 
          className="w-full sm:flex-1 bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-200 text-blue-600"
          onClick={() => window.location.href = `tel:${broker.phone}`}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:flex-1 bg-emerald-50 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 text-emerald-600"
          onClick={() => window.location.href = `mailto:${broker.email}`}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:flex-1 bg-indigo-50 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 text-indigo-600"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>
    </>
  );

  const WorkflowContent = () => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Onboarding Workflow</h3>
      <ol className="relative border-l border-muted">
        {workflow.map((step, index) => (
          <li key={index} className="mb-4 ml-4">
            <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-muted-foreground bg-background">
              {index <= 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
              )}
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${
                index <= 2 ? 'text-foreground font-medium' :
                index === 3 ? 'text-foreground' :
                'text-muted-foreground'
              }`}>
                {step}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <Card className="p-6 shadow-lg border-0 rounded-xl bg-white">
      <div className="flex items-start justify-between pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-blue-600">{broker.name}</h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 py-6 border-b border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{broker.deals}</div>
          <div className="text-sm text-gray-600">Deals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">{broker.approval_rate}</div>
          <div className="text-sm text-gray-600">Approval</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">${broker.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-wrap gap-2 py-6 max-w-3xl mx-auto w-full">
        <Button variant="outline" className="w-full sm:flex-1 h-10" onClick={() => window.location.href = `tel:${broker.phone}`}>
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Button>
        <Button variant="outline" className="w-full sm:flex-1 h-10" onClick={() => window.location.href = `mailto:${broker.email}`}>
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
        <Button variant="outline" className="w-full sm:flex-1 h-10">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>

      {/* Workflow Section */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Workflow</h3>
        <div className="space-y-3">
          {workflow.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index <= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {index <= 2 ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm ${
                index <= 2 ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-600">E Ardsassist</span>
        <Toggle
          aria-label="Toggle AI assistant"
          pressed={aiAssistant}
          onPressedChange={setAiAssistant}
        />
      </div>

      {/* Mobile View */}
      <div className="lg:hidden" data-testid="broker-accordion">
        <Accordion type="single" collapsible>
          <AccordionItem value="broker-info">
            <AccordionTrigger data-testid="broker-accordion-trigger">
              <div>
                <h2 className="text-xl font-bold text-foreground">{broker.name}</h2>
                <div className="text-sm text-muted-foreground">{broker.role}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <BrokerContent />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="workflow">
            <AccordionTrigger>
              Onboarding Workflow
            </AccordionTrigger>
            <AccordionContent>
              <WorkflowContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-6" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">E Ardsassist</span>
          <Toggle
            aria-label="Toggle AI assistant"
            pressed={aiAssistant}
            onPressedChange={setAiAssistant}
          />
        </div>
      </div>
    </Card>
  )
}
