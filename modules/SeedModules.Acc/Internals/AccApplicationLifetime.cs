using Microsoft.AspNetCore.Hosting;
using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SeedModules.Acc.Internals
{
    public class AccApplicationLifetime : IApplicationLifetime, IModuleTenantEvents
    {
        private readonly CancellationTokenSource _startedSource = new CancellationTokenSource();
        private readonly CancellationTokenSource _stoppingSource = new CancellationTokenSource();
        private readonly CancellationTokenSource _stoppedSource = new CancellationTokenSource();

        public CancellationToken ApplicationStarted => _startedSource.Token;

        public CancellationToken ApplicationStopping => _stoppingSource.Token;

        public CancellationToken ApplicationStopped => _stoppedSource.Token;

        public Task ActivatedAsync()
        {
            return Task.CompletedTask;
        }

        public Task ActivatingAsync()
        {
            return Task.CompletedTask;
        }

        public void StopApplication()
        {

        }

        public Task TerminatedAsync()
        {
            if (!_stoppedSource.IsCancellationRequested)
                _stoppedSource.Cancel(false);

            return Task.CompletedTask;
        }

        public Task TerminatingAsync()
        {
            if (!_stoppingSource.IsCancellationRequested)
                _stoppingSource.Cancel(false);

            return Task.CompletedTask;
        }

        internal void OnTenantStarted()
        {
            if (!_startedSource.IsCancellationRequested)
                _startedSource.Cancel(false);
        }
    }
}
