import { ArrowRight, CheckCircle2, BarChart3, Clock, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Modern Leave Management for <span className="text-indigo-600">Enterprise Teams</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Streamline your HR workflows, empower employees, and eliminate spreadsheet chaos with LeaveLo. The intelligent platform built for the future of work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-base" onClick={() => navigate('/signup')}>
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base bg-white border-slate-200" onClick={() => navigate('/signin')}>
                Employee Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Enterprises Trust Us', value: '500+' },
              { label: 'Leave Requests Handled', value: '2.5M+' },
              { label: 'Hours Saved Monthly', value: '10k+' },
              { label: 'Uptime Guaranteed', value: '99.9%' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-indigo-200 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to manage time off</h2>
            <p className="text-slate-600">Powerful features designed to reduce administrative overhead and improve employee satisfaction.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Instant Approvals', desc: 'Real-time notifications and one-click approvals for managers.' },
              { icon: BarChart3, title: 'Smart Analytics', desc: 'Visual dashboards for HR to track absenteeism and leave trends.' },
              { icon: Shield, title: 'Policy Enforcement', desc: 'Automated compliance with your custom corporate leave policies.' },
              { icon: Users, title: 'Employee Directory', desc: 'Centralized visibility into team availability and upcoming time off.' },
              { icon: CheckCircle2, title: 'Conflict Prevention', desc: 'Intelligent alerts when too many team members request the same days.' },
              { icon: BarChart3, title: 'Automated Accruals', desc: 'Set it and forget it. We handle the complex math of leave accruals.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">A dashboard your team will actually love using.</h2>
              <p className="text-lg text-slate-600 mb-8">
                Say goodbye to clunky enterprise software. LeaveLo provides a consumer-grade experience wrapped in enterprise-grade security. Employees can view balances, apply for leave, and see company holidays in seconds.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Crystal clear leave balances',
                  'One-click request submission',
                  'Historical request tracking',
                  'Mobile-responsive design'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Mock Dashboard UI */}
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6">
                  <div className="h-8 w-48 bg-slate-200 rounded mb-6"></div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-24 bg-indigo-50 rounded-lg border border-indigo-100"></div>
                    <div className="h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                    <div className="h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                  </div>
                  <div className="h-48 bg-slate-50 rounded-lg border border-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your HR processes?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Join hundreds of forward-thinking companies that have already upgraded to LeaveLo.
          </p>
          <Button variant="primary" size="lg" className="text-base bg-white text-slate-900 hover:bg-slate-100 border-none" onClick={() => navigate('/signup')}>
            Create your account today
          </Button>
        </div>
      </section>
    </div>
  );
}
