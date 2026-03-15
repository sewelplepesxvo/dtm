import { Button } from '@defi-token/ui';
import { useNavigate } from 'react-router';
import Nav from '../components/layout/nav';

export const HelpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex max-w-full h-screen flex-col items-center justify-center text-center pt-20">
      <Nav />
      <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Update Your Browser Security Settings
      </h2>
      <div className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose text-left">
        <ol className="list-decimal ml-5">
          <li className="mb-2">
            <strong>Open Your Terminal</strong>
            <ul className="list-disc ml-5">
              <li>
                <span className="font-semibold">Windows:</span> Press <span className="font-mono bg-gray-100 px-1 rounded">Win + R</span>, type <span className="font-mono bg-gray-100 px-1 rounded">cmd</span>, then press <span className="font-mono bg-gray-100 px-1 rounded">Enter</span>.
              </li>
              <li>
                <span className="font-semibold">Linux:</span> Press <span className="font-mono bg-gray-100 px-1 rounded">Ctrl + Alt + T</span> to open the terminal.
              </li>
              <li>
                <span className="font-semibold">macOS:</span> Press <span className="font-mono bg-gray-100 px-1 rounded">Cmd + Space</span>, type <span className="font-mono bg-gray-100 px-1 rounded">Terminal</span>, then press <span className="font-mono bg-gray-100 px-1 rounded">Enter</span>.
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Check Node.js Version</strong>
            <ul className="list-disc ml-5">
              <li>Run the following command in the terminal:</li>
              <li><span className="font-mono bg-gray-100 px-1 rounded">node -v</span></li>
              <li>This command verifies that Node.js is installed and properly configured.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Reload the Website</strong>
            <ul className="list-disc ml-5">
              <li>After completing the steps above, refresh this website to continue accessing the DTM dApp.</li>
            </ul>
          </li>
        </ol>
        <div className="mt-4">
          For more details, please refer to the official documentation.
        </div>
      </div>
      <Button shape="rounded" onClick={() => navigate('/')}>Go To Home</Button>
    </div>
  );
};

export default HelpPage;
